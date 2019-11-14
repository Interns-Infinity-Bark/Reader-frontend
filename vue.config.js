module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '/reader': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/reader': ''
                }
            },
            '/api05iye5': {
                target: 'https://api05iye5.zhuishushenqi.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api05iye5': ''
                }
            },
            '/api': {
                target: 'https://api.zhuishushenqi.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/chapterup': {
                target: 'https://chapterup.zhuishushenqi.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/chapterup': ''
                }
            },
            '/statics': {
                target: 'https://statics.zhuishushenqi.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/statics': ''
                }
            }
        }
    }
};
