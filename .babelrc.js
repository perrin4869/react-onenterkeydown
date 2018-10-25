const env = process.env.NODE_ENV || 'production';
const targets = env === 'test' ? { node: 'current' } : null;

module.exports = {
  presets: [
    ['@babel/env', targets ? { targets } : {}],
    '@babel/react',
  ],
  plugins: [
    '@babel/proposal-class-properties',
    ...(env === 'test' ? ['istanbul'] : []),
  ],
};
