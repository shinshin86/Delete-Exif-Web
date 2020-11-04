const { NODE_ENV, BABEL_ENV } = process.env;

const cjs = BABEL_ENV === 'cjs' || NODE_ENV === 'test';
const prod = NODE_ENV === 'production';

module.exports = {
  presets: [
    '@babel/react',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ],
  plugins: [
    [[cjs && '@babel/transform-modules-commonjs'].filter(Boolean)],
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true
      }
    ]
  ]
};
