const fs = require('fs');

const { printSchema } = require('graphql');

const cacheSchema = ({ cacheDir, schemaPairs }) => {
  const isDir = fs.existsSync(cacheDir) && fs.lstatSync(cacheDir).isDirectory();

  if (!isDir) {
    fs.mkdirSync(cacheDir);
  }

  schemaPairs.forEach(([schemaKey, schema]) => {
    // eslint-disable-next-line no-underscore-dangle
    if (schema._queryType) {
      fs.writeFileSync(`${cacheDir}/${schemaKey}.gql`, printSchema(schema));
    } else {
      fs.writeFileSync(`${cacheDir}/${schemaKey}.gql`, 'type Query { _: String }');
    }
  });
};

module.exports = cacheSchema;
