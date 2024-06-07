const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default
const ImageminMozjpeg = require("imagemin-mozjpeg")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const WorkboxWebpackPlugin = require("workbox-webpack-plugin")
const path = require("path")

module.exports = (env, argv) => {
    const isWatchMode = argv.watch || argv.mode === "development"

    const plugins = [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "src/templates/index.html"),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/public/"),
                    to: path.resolve(__dirname, "dist/"),
                    globOptions: {
                        ignore: ["**/images/**"],
                    },
                },
            ],
        }),
        new ImageminWebpackPlugin({
            plugins: [
                ImageminMozjpeg({
                    quality: 50,
                    progressive: true,
                }),
            ],
        }),
        new BundleAnalyzerPlugin(),
    ]

    if (!isWatchMode) {
        plugins.push(
            new WorkboxWebpackPlugin.GenerateSW({
                swDest: "./sw.bundle.js",
                runtimeCaching: [
                    {
                        urlPattern: ({ url }) => url.href.startsWith("https://restaurant-api.dicoding.dev"),
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "restaurant-api",
                        },
                    },
                    {
                        urlPattern: ({ url }) => url.href.startsWith("https://restaurant-api.dicoding.dev/images/medium/<pictureId>"),
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "restaurant-api-images",
                        },
                    },
                ],
            }),
        )
    }

    return {
        entry: {
            app: path.resolve(__dirname, "src/scripts/index.js"),
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "css-loader",
                        },
                    ],
                },
            ],
        },
        plugins,
        optimization: {
            splitChunks: {
                chunks: "all",
                name: "vendors",
            },
        },
    }
}
