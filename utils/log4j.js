const log4js = require('log4js');
log4js.configure({
    replaceConsole: true,
    pm2: true,
    appenders:{
        stdout: {
            type: 'console'
        },
        req:{
            type:'dateFile',
            filename:'log/req/req',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        err:{
            type:'dateFile',
            filename:'log/req/req',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        oth:{
            type:'dateFile',
            filename:'log/req/req',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        
    },
    categories:{
        default:{ appenders: ['stdout','req'],level:'debug'},
        err:{appenders: ['stdout','err'], level:'error'},
    }
});
exports.getLogger = function(name){
    return log4js.getLogger(name || 'default')
};
exports.useLogger = function(app,logger){
    app.use(log4js.connectLogger(logger || log4js.getLogger('default'),{
        format:'[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :use-agent]'
    }))
};