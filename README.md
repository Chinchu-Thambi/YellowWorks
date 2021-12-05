# Beta Yellow Customer Portal Front-End

This repo contains the front end code for the Beta Yellow Customer Portal project.
The initial scope consists in allowing users to browse Yellow's product catalog 
available in BigCommerce based one the [product catalog deisgn](https://www.notion.so/yellownz/Product-Catalogue-Design-7b456fc34d5d4b26bb0d937633387fa4).

# Scripts

From the root directory, the following scripts are available:

* `npm run build` - Builds the Gatsby production static files build;
* `npm run develop` - Starts Gatsby in development mode, fetching the resources and serving the content;
* `npm start` - alias for `npm run develop`;
* `npm run serve` - serves the production build on localhost:8000, by default;
* `npm test` - runs the test suit for code base.

# Setting up your local environment

To start up local development environment or create a build, you must configure your environment for the following:

* Environmental settings for any content sources that Gatsby uses during the build process
* Environmental settings required for client runtime

To create environmental settings, first create a `.env` file in the root of this repository and add required settings:

```
CONTENTFUL_SPACE_ID=xxxxxxx
CONTENTFUL_ACCESS_TOKEN=xxxxxx
```

If you need to create a new contentful space for local development, the data structure and
an example data set can be imported using `npm run contentful-import`.

Gatsby requires you to define a `.env.development` (used for `gatsby develop`) and `.env.production` (used for
`gatsby build` and `gatsby serve`) settings file, so you can create symbolic links to your `.env` file
(the `.env` file is required for Docker build):

```bash
$ ln -s .env .env.development
$ ln -s .env .env.production
```

# Unit Tests

`npm test` runs the unit test suite.

`npm test -- --coverage` runs the test suite, displays the coverage report on the terminal and
creates a [friendlier html version](./coverage/lcov-report/index.html).

`npm test -- --watch` runs the test suite and keeps it watching for changes in the test files. This is incredibly useful
when writing tests.

`npm test -- -u` updates the snapshot tests to accommodate for new values.

### Test resources

- [Jest Expect reference](https://jestjs.io/docs/en/expect.html), useful for comparing values and expecting values;
- [React Testing Library](https://testing-library.com/docs/dom-testing-library/api-queries), useful for rendering
  react components and matching [accessibility features](https://testing-library.com/docs/guide-which-query) and text;

# Docker Workflow

> Please note these commands will not work on macOS' default GNU Make 3.81, so make sure you are running a
> compatible version. Protip: `brew install gmake` installs GNU Make 4.2.1 under `gmake`.

To create a production build and run tests:

```
make release
```

To publish your production build:

```
$ export AWS_PROFILE=yellownz-sandbox
$ make publish
```

To clean your local build environment:

```
make clean
```

## Environment variables

New environment variables need to be added to `pipeline.yaml`, `Dockerfile` and `docker-compose.yml` files.

After that, `make pipeline` needs to be run so that the pipeline is updated with the new values. Credentials can
be acquired through [these instructions](https://www.notion.so/yellownz/AWS-Single-Sign-ON-2762ce0e3b9841499c1eae2cb9c9b84c).

# Scene Based Architecture

We try to use a scene organisation for where code should belong, as suggested by
[@alexmngn](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1).

The basic idea is as follows:

* A component can define nested components or services. It cannot use or define scenes.
* A scene can define nested components, scenes or services.
* A service can define nested services. It cannot use or define components or scenes.
* Nested features can only use from its parent.

This was defined after the project is started so there are things out of place. Feel free to reorganise them.

For all intents and purposes, the folder at ./src/util is a service folder.

# Expected File Structure

## Component

- ./components/...?
- ./services/...?
- ./index.js
- ./Component.js
- ./Component.styled.js
- ./Component.spec.js

## Scene

- ./components/...
- ./scenes/...?
- ./services/...?
- ./index.js
- ./Scene.js
- ./Scene.spec.js
- ./Scene.styled.js?

## Mocked Graphql Endpoint

### Basic usage

In order to have Gatsby's dev server run with mocked endpoints, add a comma separated list of endpoints you want to mock
to the variable `MOCK_GRAPHQL_ENDPOINTS` in the `.env` file. Add the `LOCAL_MOCKED_GRAPHQL_ENDPOINT` variable pointing 
to localhost's graphql endpoint, as well.

When working with a mocked endpoint just use `LOCAL_MOCKED_GRAPHQL_ENDPOINT` instead of the original.

`CYPRESS_TEST_USER` and `CYPRESS_TEST_PASSWORD` `.env` variables will be used for fetching uncached schemas from 
AppSync. Any registered user in cognito should work.

```env
# .env
MOCK_GRAPHQL_ENDPOINTS=GATSBY_APPSYNC_URL,GATSBY_PRODUCT_PLATFORM_ENDPOINT
LOCAL_MOCKED_GRAPHQL_ENDPOINT=https://localhost:8000/graphql
```

### Mock an unimplemented schema

By adding an inexistent endpoint to the `MOCK_GRAPHQL_ENDPOINTS` variable, the script will create a file for it in 
the `/src/graphql/localMocking/cache` folder. Update it with the schema you want to have mocked and restart the server. 
It will use the cached definition and serve from that..


.