require('dotenv').config();

const { execSync } = require('child_process');

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN } = process.env;

const contentfulExport = `\
  contentful space export\
  --config ./contentful/export-config.json\
  --space-id ${CONTENTFUL_SPACE_ID}\
  --management-token ${CONTENTFUL_MANAGEMENT_TOKEN}\
`;

execSync(
  contentfulExport,
  {
    stdio: 'inherit',
  },
);
