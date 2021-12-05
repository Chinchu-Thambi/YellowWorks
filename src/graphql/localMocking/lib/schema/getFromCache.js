const fs = require('fs');

const R = require('ramda');
const { loadFiles, makeExecutableSchema } = require('graphql-tools');

const getFromCache = async ({ schemaEndpoints, cacheDir }) => {
  const schemaPairs = (await Promise.all(
    Object.keys(schemaEndpoints)
      .map(
        async (schemaKey) => {
          const filePath = `${cacheDir}/${schemaKey}.gql`;
          const fileExists = fs.existsSync(filePath);

          if (!fileExists) {
            return null;
          }

          return [
            schemaKey,
            makeExecutableSchema({
              typeDefs: await loadFiles(filePath),
            }),
          ];
        },
      ),
  )).filter(Boolean);

  const missingSchemaEndpoints = R.compose(
    R.fromPairs,
    R.filter(([k]) => !R.find(R.pathEq([0], k), schemaPairs)),
    Object.entries,
  )(schemaEndpoints);

  return {
    schemaPairs,
    missingSchemaEndpoints,
  };
};

module.exports = getFromCache;
