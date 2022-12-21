module.exports = {
  env: {
    production: {
      plugins: [['transform-react-remove-prop-types', {removeImport: true}]],
    },
  },

  presets: [
    [
      '@babel/preset-env',

      {
        modules: false,

        targets: {
          browsers: require('./browserslist'),
        },

        useBuiltIns: false,
      },
    ],

    '@babel/react',
  ],
}
