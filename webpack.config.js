const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.module.rules.push(
    {
      test: /\.module\.scss$/,
      use: [
        // Creates `style` nodes from JS strings
        // MiniCssExtractPlugin.loader,
        "style-loader",
        // Translates CSS into CommonJS
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            }
          }
        },
        "sass-loader"
      ],
    }
  );

  // config.plugins = config.plugins.concat(
  //   [
  //     new MiniCssExtractPlugin()
  //   ]
  // );


  return config;
};
