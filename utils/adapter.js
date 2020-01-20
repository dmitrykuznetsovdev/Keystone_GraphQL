const { LocalFileAdapter } = require('@keystonejs/file-adapters');

const { staticRoute, staticPath, distDir } = require('../config');
const dev = process.env.NODE_ENV !== 'production';

let iframelyAdapter;

if (process.env.IFRAMELY_API_KEY) {
    const { IframelyOEmbedAdapter } = require('@keystonejs/oembed-adapters');
    iframelyAdapter = new IframelyOEmbedAdapter({
        apiKey: process.env.IFRAMELY_API_KEY,
    });
}

const fileAdapter = new LocalFileAdapter({
    src: `${dev ? '' : `${distDir}/`}${staticPath}/uploads`,
    path: `${staticRoute}/uploads`,
});

const avatarFileAdapter = new LocalFileAdapter({
    src: `${staticPath}/avatars`,
    path: `${staticRoute}/avatars`,
});


module.exports = {
    iframelyAdapter,
    fileAdapter,
    avatarFileAdapter
}