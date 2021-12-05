import boto3
from .conftest import github

codebuild = boto3.client('codebuild')

def test_codebuild_webhook_creates_github_webhook(test_stack,github_repo):
  project = next(
    output['OutputValue']
    for output in test_stack['Outputs']
    if output['OutputKey'] == 'BuildProjectArn'
  )
  [project_webhook] = codebuild.batch_get_projects(names=[project])['projects']
  hooks = github_repo.get_hooks()
  assert any(hook.config['url'] == project_webhook['webhook']['payloadUrl'] for hook in hooks)
