const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config();

const tailwindConfig = require('./tailwind.config.js');

const { getNodes, toSitemapFormat } = require('./src/services/getNodes');
const mockedGraphqlMiddleware = require('./src/graphql/localMocking/mockedGraphqlMiddleware');
const sourceProductPlatformFetch = require('./src/graphql/sourceProductPlatformFetch');

module.exports = {
  siteMetadata: {
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    // frontend build
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        displayName: process.env.NODE_ENV === 'development',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Yellow NZ',
        short_name: 'Yellow NZ',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#1F2A44',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: 'src/assets/logos/y-favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: 'sitemap_statics.xml',
        exclude: [
          '/my-yellow/', '/my-yellow/*',
          '/our-products/search-ads/onboarding/', '/our-products/search-ads/onboarding/*',
          '/example/', '/example/*',
          '/demo/', '/demo/*',
        ],
        serialize: ({ site, allSitePage }) => {
          const { allPages } = getNodes(allSitePage);

          const siteUrl = site.siteMetadata && site.siteMetadata.siteUrl;

          const honeyPot = {
            url: `${(siteUrl) || ''}/y/nicks-plumbing`,
            changefreq: 'weekly',
            priority: 0.6,
          };

          const sitemap = allPages && allPages
            .map(toSitemapFormat(siteUrl))
            .concat(honeyPot);

          return sitemap;
        },
      },
    },
    'gatsby-plugin-offline',

    // frontend tooling
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('tailwindcss')(tailwindConfig),
          require('autoprefixer'),
          ...(process.env.NODE_ENV === 'production'
            ? [require('cssnano')]
            : []),
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['lato:400,400i,700', 'montserrat:400,700'],
        display: 'swap',
      },
    },
    'gatsby-plugin-no-sourcemaps',
    { resolve: 'gatsby-plugin-react-axe' },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop', 'build-javascript'],
        options: {
          emitWarning: true,
          failOnError: process.env.NODE_ENV !== 'development',
        },
      },
    },

    // source content
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.NODE_ENV === 'production'
          ? process.env.CONTENTFUL_ACCESS_TOKEN
          : process.env.CONTENTFUL_PREVIEW_TOKEN,
        host: process.env.CONTENTFUL_HOST
          || (
            process.env.NODE_ENV === 'production'
              ? 'cdn.contentful.com'
              : 'preview.contentful.com'
          ),
      },
    },
    // Detects for endpoint to allow for safe failure in cases of iam invalidity
    ...(process.env.IAM_PRODUCT_PLATFORM_ENDPOINT ? [{
      resolve: 'gatsby-source-graphql',
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: 'ProductPlatform',
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: 'productPlatform',
        // Url to query from
        url: process.env.IAM_PRODUCT_PLATFORM_ENDPOINT,
        fetch: sourceProductPlatformFetch,
      },
    }] : []),

    // third parties
    {
      resolve: 'gatsby-plugin-hubspot',
      options: {
        trackingCode: process.env.GATSBY_HUBSPOT_ACCOUNT,
      },
    },
    {
      resolve: 'gatsby-plugin-segment-js',
      options: {
        prodKey: process.env.SEGMENT_KEY,
        devKey: process.env.SEGMENT_KEY,
      },
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        disable: process.env.NODE_ENV === 'development',
        src: 'https://www.datadoghq-browser-agent.com/datadog-logs-us.js',
        onLoad: `() => DD_LOGS.init({
            clientToken: '${process.env.DATA_DOG_KEY}',
            forwardErrorsToLogs: true,
        })`,
      },
    },
    {
      resolve: 'gatsby-plugin-stripe',
      options: {
        async: true,
      },
    },

    // security
    {
      resolve: 'gatsby-plugin-sri',
      options: {
        hash: 'sha512', // 'sha256', 'sha384' or 'sha512' ('sha512' = default)
        crossorigin: true, // Optional
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: process.env.SITE_URL,
        sitemap: `${process.env.SITE_URL}/sitemap.xml`,
        resolveEnv: () => process.env.ROBOTS_TXT_TEMPLATE_ENV,
        env: {
          // development is the default policy if the environment variable is not found (the policies here should be the same as prod)
          development: {
            policy: [{
              userAgent: '*',
              disallow: [
                '/api/',
                '/services/',
                '/user/',
                'reset/',
                'listing/',
                'review/',
                'designs/',
                '/*?_bc_fsnf=1*',
                '/*&_bc_fsnf=1*',
              ],
            },
            {
              userAgent: 'bingbot',
              disallow: [
                '/api/',
                '/services/',
                '/user/',
                '/reset/',
                '/listing/',
                '/review/',
                '/designs/',
              ],
              crawlDelay: 5,
            },
            {
              userAgent: 'AdsBot-Google',
              disallow: [
                '/account.php',
                '/cart.php',
                '/checkout.php',
                '/finishorder.php',
                '/login.php',
                '/orderstatus.php',
                '/postreview.php',
                '/productimage.php',
                '/productupdates.php',
                '/remote.php',
                '/search.php',
                '/viewfile.php',
                '/wishlist.php',
                '/admin/',
                '/__socialshop/ ',
              ],
            },
            {
              userAgent: 'google-xrawler',
              allow: '/feeds/*',
            },
            ],
          },
          nonproduction: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{
              userAgent: '*',
              disallow: [
                '/api/',
                '/services/',
                '/user/',
                'reset/',
                'listing/',
                'review/',
                'designs/',
                '/*?_bc_fsnf=1*',
                '/*&_bc_fsnf=1*',
              ],
            },
            {
              userAgent: 'bingbot',
              disallow: [
                '/api/',
                '/services/',
                '/user/',
                '/reset/',
                '/listing/',
                '/review/',
                '/designs/',
              ],
              crawlDelay: 5,
            },
            {
              userAgent: 'AdsBot-Google',
              disallow: [
                '/account.php',
                '/cart.php',
                '/checkout.php',
                '/finishorder.php',
                '/login.php',
                '/orderstatus.php',
                '/postreview.php',
                '/productimage.php',
                '/productupdates.php',
                '/remote.php',
                '/search.php',
                '/viewfile.php',
                '/wishlist.php',
                '/admin/',
                '/__socialshop/ ',
              ],
            },
            {
              userAgent: 'google-xrawler',
              allow: '/feeds/*',
            },
            ],
          },
        },
      },
    },
  ],
  developMiddleware: (app) => {
    if (process.env.LOCAL_MOCKED_GRAPHQL_ENDPOINT) {
      app.use('/graphql', mockedGraphqlMiddleware);
    }

    app.use('/api/storefront', createProxyMiddleware({
      target: process.env.GATSBY_BIGCOMMERCE_PROXIED_ENDPOINT,
      secure: false, // Do not reject self-signed certificates.
      changeOrigin: true, // needed for virtual hosted sites
    }));
  },
};
