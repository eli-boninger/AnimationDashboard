/**************************************************************************
 *  ADOBE CONFIDENTIAL
 *
 *  Copyright 2023 Adobe
 *  All Rights Reserved.
 *
 *  NOTICE:  All information contained herein is, and remains
 *  the property of Adobe and its suppliers, if any. The intellectual
 *  and technical concepts contained herein are proprietary to Adobe
 *  and its suppliers and are protected by all applicable intellectual
 *  property laws, including trade secret and copyright laws.
 *  Dissemination of this information or reproduction of this material
 *  is strictly forbidden unless prior written permission is obtained
 *  from Adobe.
 ***************************************************************************/

'use strict';

import { join, resolve } from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { aliases } from "@swc-uxp-wrappers/utils";


const ENV = process.argv.find((arg) => arg.includes('NODE_ENV=production'))
    ? 'production'
    : 'development';

const IS_DEV_SERVER = process.argv.find((arg) =>
    arg.includes('webpack-dev-server')
);
const OUTPUT_PATH = IS_DEV_SERVER ? resolve('dist') : resolve('dist');

/**
 * === Copy static files configuration
 */
const copyStatics = {
    patterns: [
        {
            from: 'index.html',
            context: resolve('./src'),
            to: OUTPUT_PATH,
        },
        {
            from: 'manifest.json',
            context: resolve('./'),
            to: OUTPUT_PATH,
        },
    ],
};

/**
 * Plugin configuration
 */
const plugins = [
    new CopyWebpackPlugin(copyStatics),
];

const shared = (env) => {
    if (!IS_DEV_SERVER) {
        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: '../report/report.html',
                statsFilename: '../report/stats.json',
                generateStatsFile: true,
                statsOptions: {
                    chunkModules: true,
                    children: false,
                    source: false,
                },
            })
        );
    }

    return {
        entry: {
            index: './src/index.js',
        },
        devtool: 'cheap-module-source-map',
        mode: ENV,
        output: {
            path: OUTPUT_PATH,
            filename: '[name].js',
            publicPath: '',
            clean: true
        },

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.json'],
            alias: aliases,
        },
        plugins,
        devServer: {
            compress: true,
            port: 3000,
            host: '0.0.0.0',
        },
    };
};

export default (env = {}) => {
    return [shared(env)];
};