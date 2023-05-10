const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const styles = require('../antd.styles');

module.exports = {
    stories: ['../src/general-ui/**/*.stories.(ts|tsx)'],
    addons: [
        '@storybook/addon-knobs',
        '@storybook/addon-a11y/register',
        '@storybook/addon-links/register',
        '@storybook/addon-actions/register',
    ],
    babel: async (options) => ({
        // ...options,
        presets: [
            '@babel/preset-react',
            '@babel/preset-typescript',
            //https://github.com/storybookjs/storybook/issues/7540
        ],
        plugins: ['@emotion/babel-plugin', 'babel-plugin-macros'],
    }),
    webpackFinal: async (config) => {
        config.resolve = {
            ...config.resolve,
            alias: {
                ...config.resolve.alias,
                '@common': path.resolve(__dirname, '../src/'),
                '@assets': path.resolve(__dirname, '../src/assets/'),
            },
        };
        config.module.rules.push({
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            modifyVars: styles,
                            javascriptEnabled: true,
                        },
                    },
                },
            ],
            include: path.resolve(__dirname, '../'),
        });

        config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }));

        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve('babel-loader'),
            options: {
                presets: [
                    ['react-app', { flow: false, typescript: true }],
                    require.resolve('@emotion/babel-preset-css-prop'),
                ],
            },
        });

        config.resolve.extensions.push('.ts', '.tsx');

        return config;
    },
};
