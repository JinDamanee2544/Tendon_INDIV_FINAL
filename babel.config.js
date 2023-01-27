export const presets = ['next/babel'];
export const plugins = [
  'babel-plugin-transform-typescript-metadata',
  ['@babel/plugin-proposal-decorators', { legacy: true }]
];
  