module.exports = {
    baseUrl: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.zhuishushenqi.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/api05iye5': {
                target: 'https://api05iye5.zhuishushenqi.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api05iye5': ''
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
