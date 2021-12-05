const tailwindCustomForms = require('@tailwindcss/custom-forms');
const tailwindTheme = require('./src/services/theme.json');

// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    // enabled: true, // if you want purge enabled even in dev mode
    content: ['./src/**/*.js', './src/**/*.css'],
    // These options are passed through directly to PurgeCSS
    // Whitelisted classes go here
    // options: {
    //   whitelistPatterns: [/.*-(tradie|rose|fresh|pro)-.*/],
    // },
  },
  // More on tailwind theme configuration
  // https://github.com/tailwindlabs/tailwindcss/blob/v1/stubs/defaultConfig.stub.js#L5
  // https://tailwindcss.com/docs/theme
  theme: {
    extend: {
      ...tailwindTheme,
      minWidth: (theme) => theme('spacing'),
      maxWidth: (theme) => theme('spacing'),
      minHeight: (theme) => theme('spacing'),
      maxHeight: (theme) => theme('spacing'),
      width: (theme) => theme('spacing'),
      height: (theme) => theme('spacing'),
      flex: {
        1: '1 1 0%',
        auto: '1 1 auto',
        initial: '0 1 auto',
        none: 'none',
        2: '2 2 0%',
        3: '3 3 0%',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    textColor: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [
    // https://github.com/tailwindcss/custom-forms
    tailwindCustomForms,
  ],
  corePlugins: {
    // https://tailwindcss.com/docs/preflight
    // we already use normalize.css which preflight builds lightly on
    preflight: false,
  },
};
