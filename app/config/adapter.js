const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const ejs = require('think-view-ejs');
const fileSession = require('think-session-file');
const {
    Console,
    File,
    DateFile
} = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
    type: 'file',
    common: {
        timeout: 24 * 60 * 60 * 1000 // millisecond
    },
    file: {
        handle: fileCache,
        cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
        pathDepth: 1,
        gcInterval: 24 * 60 * 60 * 1000 // gc interval
    }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
    type: 'mongo',
    common: {
        logConnect: isDev,
        logSql: isDev,
        logger: msg => think.logger.info(msg)
    },
    //#smudge mongodb配置
    //#BEGIN
    mongo: {
        host: '62.234.1.82',
        port: '9000',
        user: 'chatRoot',
        password: 'chat5548..',
        database: 'chat',
        prefix: ''
    },
    mongoPassword: {
        host: '62.234.1.82',
        port: '9000',
        user: 'passwordRoot',
        password: 'password5548..',
        database: 'password',
        prefix: ''
    },
    logServerWebhookSecret: '19b4f8959a5581e0f11fde46b131f97a85e80925'
    //#END
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
    type: 'file',
    common: {
        cookie: {
            name: 'thinkjs'
            // keys: ['werwer', 'werwer'],
            // signed: true
        }
    },
    file: {
        handle: fileSession,
        sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
    }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
    type: 'ejs',
    common: {
        viewPath: path.join(think.ROOT_PATH, 'view'),
        sep: '/',
        extname: '.html'
    },
    ejs: {
        handle: ejs
    },
    nunjucks: {
        handle: nunjucks
    }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
    type: isDev ? 'console' : 'dateFile',
    console: {
        handle: Console
    },
    file: {
        handle: File,
        backups: 10, // max chunk number
        absolute: true,
        maxLogSize: 50 * 1024, // 50M
        filename: path.join(think.ROOT_PATH, 'logs/app.log')
    },
    dateFile: {
        handle: DateFile,
        level: 'ALL',
        absolute: true,
        pattern: '-yyyy-MM-dd',
        alwaysIncludePattern: true,
        filename: path.join(think.ROOT_PATH, 'logs/app.log')
    }
};