module.exports = {
  plugins: [['@babel/plugin-transform-react-jsx', {runtime: 'automatic'}]],

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

    '@babel/preset-typescript',
    '@babel/react',
  ],
}
