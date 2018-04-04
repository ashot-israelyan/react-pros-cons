const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = env => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('/styles/main.css');

    const plugins = [
        CSSExtract,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'javascripts/app.vendor.bundle.js',
        }),
        new CleanWebpackPlugin(['./public']),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: env === 'production'
            },
            hash: env === 'production',
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
    ];

    if (isProduction) {
        plugins.push(new UglifyJsPlugin({
            sourceMap: true,
            parallel: true
        }));
    }

    return {
        entry: {
            app: ['babel-polyfill', './src/app.js'],
            vendor: [
                'react',
                'react-dom',
                'react-router-dom',
                'redux',
                'react-redux',
                'lodash',
                'prop-types',
                'react-dnd',
                'react-dnd-html5-backend'
            ]
        },
        output: {
            filename: 'javascripts/app.bundle.js',
            path: path.join(__dirname, 'public')
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js?$/,
                exclude: /(node_modules)/,
                options: {
                    presets: [
                        ['env', { targets: { browsers: ['> 1%', 'last 2 versions'] } }],
                        'es2015',
                        'react',
                        'stage-2'
                    ],
                    plugins: ['transform-class-properties', 'transform-decorators-legacy']
                }
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: true,
                                minimize: isProduction,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    autoprefixer({
                                        browsers: [
                                            "> 1%",
                                            "last 2 versions"
                                        ]
                                    })
                                ]
                            }
                        }
                    ]
                })
            }]
        },
        plugins,
        devtool: isProduction ? 'source-map' : 'cheap-module-source-map'
    };
};