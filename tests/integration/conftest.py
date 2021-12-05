import os
import json
import pytest
import boto3
import backoff
import uuid
import responses
from github import Github

client = boto3.client('cloudformation')
github = Github(os.environ['GITHUB_TOKEN'])
organization = github.get_organization("yellownz")

@backoff.on_predicate(backoff.constant, 
                      lambda x: x != 'CREATE_COMPLETE',
                      interval=5, jitter=None, max_tries=40)
def check_change_set_status(change_set, c=client):
  return c.describe_change_set(ChangeSetName=change_set)['Status']

@backoff.on_predicate(backoff.constant, 
                      lambda x: x['StackStatus'] not in ['CREATE_COMPLETE','UPDATE_COMPLETE']
                                and 'ROLLBACK' not in x['StackStatus'],
                      interval=5, jitter=None, max_tries=40)
def check_stack_status(stack, c=client):
  [response] = c.describe_stacks(StackName=stack)['Stacks']
  return response

def path_to_file(filename):
  current_directory = os.path.dirname(os.path.realpath(__file__))
  return os.path.join(current_directory, filename)

@pytest.fixture(scope="session")
def github_repo():
  responses.add_passthru('https://api.github.com')
  repo_name = os.environ.get('BUILD_ID',str(uuid.uuid4()))
  repo = organization.create_repo(name=repo_name, private=True)
  yield repo
  repo.delete()

@pytest.fixture(scope="session")
def template():
  template_file_path = path_to_file("template.yaml")
  with open(template_file_path) as template:
    yield template.read()

@pytest.fixture(scope="session")
def test_stack(template,github_repo):
  stack_name = os.environ.get('BUILD_ID',str(uuid.uuid4()))
  outputs = json.loads(os.environ['STACK_OUTPUTS'])
  change_set = client.create_change_set(
    StackName='testing-{}'.format(stack_name),
    TemplateBody=template,
    ChangeSetName='integration',
    ChangeSetType='CREATE',
    Parameters=[
      {'ParameterKey':'RepositoryName','ParameterValue':github_repo.full_name},
      {'ParameterKey':'CodeBuildWebhookFunctionArn','ParameterValue':outputs['CodeBuildWebhookFunctionArn']},
    ],
    Capabilities=['CAPABILITY_NAMED_IAM','CAPABILITY_AUTO_EXPAND'],
    RoleARN=os.environ.get('ROLE_ARN','arn:aws:iam::327053179056:role/deploy')
  )
  check_change_set_status(change_set['Id'])
  client.execute_change_set(ChangeSetName=change_set['Id'])
  stack = check_stack_status(change_set['StackId'])
  yield stack
  client.delete_stack(StackName=change_set['StackId'])
