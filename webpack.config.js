const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.module.rules.push(
    {
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'dts-css-modules-loader',
          options: {
            namedExport: true,
            camelCase: true,
            modules: true,
            localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
          },
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              exportLocalsConvention: 'camelCaseOnly',
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [autoprefixer()],
            },
          },
        },
        {
          loader: 'sass-loader',
        },
      ],
    },
  );

  config.plugins = config.plugins.concat(
    [
      new MiniCssExtractPlugin()
    ]
  );


  return config;
};
