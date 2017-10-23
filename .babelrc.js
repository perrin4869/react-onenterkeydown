const env = process.env.NODE_ENV || 'production';
const targets = env === 'test' ? { node: 'current' } : null;

module.exports = {
  presets: [
    ['env', targets ? { targets } : {}],
    'react',
  ],
  plugins: [
    'transform-object-rest-spread',
    'transform-class-properties',
    ...(env === 'test' ? ['istanbul'] : []),
  ],
};
