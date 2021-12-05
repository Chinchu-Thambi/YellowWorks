# settings
PROJECT_NAME = customer-portal
COMMIT_ID ?= $(shell git rev-parse HEAD)
BRANCH_ID ?= $(shell echo $$(git rev-parse --abbrev-ref HEAD) | md5 | cut -c 1-7 -)

# Tasks
.PHONY: all release publish clean

all: release publish clean

version:
	echo $(COMMIT_ID)

install:
	npm install --prefer-offline

prune:
	npm prune

build/%:
	rm -rf .cache public*
	cp .env.$* .env
	npm run build
	mkdir -p build
	cp -r public build/public-$*

test:
	npm run test

role/%:
	export AWS_DEFAULT_REGION=ap-southeast-2
	temp_role=$$(aws sts assume-role --role-arn arn:aws:iam::$*:role/codebuild --role-session-name "build-tmp-session" --profile yellownz-sandbox)
	export AWS_ACCESS_KEY_ID=$(shell echo $$temp_role | jq -r .Credentials.AccessKeyId)
	export AWS_SECRET_ACCESS_KEY=$(shell echo $$temp_role | jq -r .Credentials.SecretAccessKey)
	export AWS_SESSION_TOKEN=$(shell echo $$temp_role | jq -r .Credentials.SessionToken)

release/%:
	cp .env.$* .env
	docker-compose build
	docker-compose up app
	app=$$(docker-compose ps -q app)
	result=$$(docker inspect -f '{{ .State.ExitCode }}' $$app)
	[ $$result -ne 0 ] && exit $$result
	if [ ! -d "build" ]; then
		mkdir build
	fi
	rm -rf build/public-$*
	docker cp $$app:/app/public ./build/public-$*

release:
	npm audit --audit-level=high
	docker-compose build
	docker-compose up app
	app=$$(docker-compose ps -q app)
	result=$$(docker inspect -f '{{ .State.ExitCode }}' $$app)
	[ $$result -ne 0 ] && exit $$result
	rm -rf public
	docker cp $$app:/app/public .

integration:
	echo "RUN INTEGRATION TESTS ON QA ENV"
	cp .env.qa .env
	npm run cy

pr_version:
	# Get PR number from Codebuild Environment
	PR_NUMBER=$(shell echo $$CODEBUILD_SOURCE_VERSION | cut -d "/" -f 2)
	# Generate file with PR number to export as exported variables
	echo "export PULL_REQUEST=$$PR_NUMBER" > EXPORTED_VARS.txt
	# Generate html file to publish in acceptance/staging environment
	echo "<h2>Current PR: $$PR_NUMBER</h2><br><a href="https://github.com/ChinchuT2021/customer_portal/pull/$$PR_NUMBER">https://github.com/yellownz/customer-portal/pull/$$PR_NUMBER</a>" > our-version.html
	cp our-version.html build/public-qa/
	cp our-version.html build/public-staging/

sync:
	echo "SYNC QA BUCKET TO INTEGRATION BUCKET"
	export AWS_PROFILE=yellownz-qa
	aws s3 sync build/public-qa s3://yellownz-integration-ap-southeast-2-public-web --delete
	echo "SYNC FILES TO ACCEPTANCE BUCKET"
	export AWS_PROFILE=yellownz-staging
	aws s3 sync build/public-staging s3://yellownz-acceptance-ap-southeast-2-public-web --delete

acceptance:
	echo "RUN ACCEPTANCE TESTS ON STAGING ENV"

publish/%:
	aws s3 sync build/public-$* s3://yellownz-$*-ap-southeast-2-public-web --delete

download: S3_BUCKET ?= yellownz-build-ap-southeast-2-code-artifacts
download:
	artifact=s3://$(S3_BUCKET)/$(PROJECT_NAME)/acceptance/$(COMMIT_ID).zip
	if aws s3 ls $$artifact >/dev/null
	then aws s3 cp $$artifact - | bsdtar -xvf-
	fi

clean:
	rm -rf .cache public* build/*
	docker-compose down -v
	docker images -q -f dangling=true -f label=application=customer-portal | xargs -I ARGS docker rmi -f --no-prune ARGS

pipeline:
	aws cloudformation deploy --profile yellownz-build --template-file pipeline.yaml --stack-name $(PROJECT_NAME)-pipeline \
	  --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND --no-fail-on-empty-changeset

# Make settings
.ONESHELL:
.SILENT:
SHELL=/bin/bash
.SHELLFLAGS = -ceo pipefail