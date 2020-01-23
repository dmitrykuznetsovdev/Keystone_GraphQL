module.exports = {
    port: process.env.PORT || 3000,
    staticRoute: '/server/public', // The URL portion
    staticPath: 'server/public', // The local path on disk
    distDir: 'dist',
};