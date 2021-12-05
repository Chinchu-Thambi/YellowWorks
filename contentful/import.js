require('dotenv').config();

const { execSync } = require('child_process');

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN } = process.env;

const contentfulImport = `\
  contentful space import\
  --config ./contentful/import-config.json\
  --space-id ${CONTENTFUL_SPACE_ID}\
  --management-token ${CONTENTFUL_MANAGEMENT_TOKEN}\
`;

execSync(
  contentfulImport,
  {
    stdio: 'inherit',
  },
);
