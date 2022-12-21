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
        modules: 'commonjs',

        targets: {
          browsers: require('./browserslist'),
        },

        useBuiltIns: false,
      },
    ],

    '@babel/react',
  ],
}
