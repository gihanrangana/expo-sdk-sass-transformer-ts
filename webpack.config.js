const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


var babelLoader = {
	loader: 'babel-loader',
	options: {
		configFile: false,
		babelrc: false,
		presets: ['@babel/env', 'react', '@babel/preset-react', 'module:metro-react-native-babel-preset'],
		plugins: [
			'react-hot-loader/babel',
			['@babel/preset-env', {
				"modules": "commonjs",
				"targets": {
					"node": "current"
				},
				loose: true
			}]
		],
	},
};

module.exports = async function (env, argv) {
	const config = await createExpoWebpackConfigAsync(env, argv);

	config.entry.push('react-hot-loader/patch')

	config.plugins.push(
		new HtmlWebpackPlugin({
			template: './web/index.html',
		}),
		new MiniCssExtractPlugin()
	)

	config.module.rules.push({
		test: /\.ts(x?)$/,
		exclude: /node_modules/,
		use: [
			babelLoader,
			{
				loader: 'ts-loader',
				options: {
					compilerOptions: {
						noEmit: false,
						target: 'es5',
					},
				},
			},
		],
	})

	config.module.rules.push({
		test: /\.js(x?)$/,
		exclude: /node_modules/,
		...babelLoader,
	})

	config.module.rules.push({
		test: /\.(jpg|png|svg)$/,
		use: {
			loader: 'file-loader',
			options: {
				name: '[path][name].[hash].[ext]',
			},
		},
	})

	config.module.rules.push({
		test: /\.css$/,
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
		],
	})

	config.module.rules.push({
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
	})

	config.resolve.alias = {
		...config.resolve.alias,
		'@babel/plugin-preset-env': require.resolve('@babel/preset-env')
	}

	return config

};
