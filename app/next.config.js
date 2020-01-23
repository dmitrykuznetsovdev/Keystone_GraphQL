const { distDir } = require('../server/config');

module.exports = {
    distDir: `../${distDir}/www`,

    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        };

        // Шрифты
        config.module.rules.push({
            test: /\.(eot|ttf|woff)$/,
            use: {
                loader: "file-loader",
                options: {
                    outputPath: `${isServer ? "../" : ""}static/fonts/`,
                    publicPath: "/_next/static/fonts/"
                }
            }
        });

        // SVG
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                "@svgr/webpack",
                {
                    loader: "file-loader",
                    options: {
                        outputPath: `${isServer ? "../" : ""}static/svg/`,
                        publicPath: "/_next/static/svg/"
                    }
                }
            ]
        });


        return config
    },

    env: {
        USER_HAS_PORTFOLIO: !!process.env.IFRAMELY_API_KEY,
        BASIC_AUTH: process.env.BASIC_AUTH,
        MODE: process.env.MODE,
    },
    onDemandEntries: {
        maxInactiveAge: 30 * 60 * 1000
    },
    poweredByHeader: false,
    devIndicators: {
        autoPrerender: true,
    },
    compress: true,
};