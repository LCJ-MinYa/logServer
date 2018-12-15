const path = require('path');
const cors = require('koa-cors');
const isDev = think.env === 'development';

module.exports = [{
        handle: 'meta',
        options: {
            logRequest: isDev,
            sendResponseTime: isDev,
            sendPowerBy: false,
            requestTimeout: 10 * 1000,
        }
    }, {
        handle: 'resource',
        enable: true,
        options: {
            root: path.join(think.ROOT_PATH, 'view/index/'),
            publicPath: /^\/(main\.js|api_data\.js|api_project\.js|css|fonts|img|utils|vendor|locales|favicon\.ico)/
        }
    }, {
        handle: 'trace',
        enable: !think.isCli,
        options: {
            debug: isDev,
            templates: {
                404: path.join(think.ROOT_PATH, 'view/error/404.html'),
            }
        }
    }, {
        handle: 'payload',
        options: {}
    }, {
        handle: 'router',
        options: {}
    }, {
        handle: cors,
        options: {}
    },
    'logic',
    'controller'
];