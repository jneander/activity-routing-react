module.exports = {
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

    '@babel/preset-typescript',
    '@babel/react',
  ],
}
