const { loadSchema, UrlLoader } = require('graphql-tools');

const getFromCache = require('./getFromCache');
const cacheSchema = require('./cacheSchema');

const getSchemas = async ({ schemaEndpoints, getToken, cacheDir }) => {
  const { schemaPairs, missingSchemaEndpoints } = await getFromCache({ schemaEndpoints, cacheDir });

  if (missingSchemaEndpoints) {
    const authorization = await getToken();

    const missingSchemaPairs = await Promise.all(
      Object.entries(missingSchemaEndpoints).map(async ([schemaKey, endpointUrl]) => {
        const schema = await loadSchema(endpointUrl, {
          loaders: [
            new UrlLoader(),
          ],
          headers: { authorization },
        });

        return [schemaKey, schema];
      }),
    );

    schemaPairs.push(...missingSchemaPairs);
    cacheSchema({ schemaPairs: missingSchemaPairs, cacheDir });
  }

  return schemaPairs;
};

module.exports = getSchemas;
