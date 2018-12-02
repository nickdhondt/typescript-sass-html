const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {

        rules: [{
            test: /\.(scss)$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => {
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                },
                'sass-loader'
            ]
        }]
    }
});