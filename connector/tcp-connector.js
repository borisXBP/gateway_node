let net = require("net");
let logger = require("../utils/log4j").getLogger("tcp-connector");

module.exports = {
    //初始化
    init: function (host, port, onReceive, onSuccess){

        if(!host || !port){
            logger.error("tcp host or port error!");
            return;
        }
        net.createServer(function (sock){
            logger.info('tcp client connected :' + sock.removeAddress + ":" + sock.remotePort);
        
            sock.on("data",function(msg){
                onReceive && onReceive(msg);
            });

            sock.on("close",function () {
                logger.info('tcp client close : ' + sock.removeAddress + ':' + sock.remotePort);
            });
        
        }).listen(port,host);
        onSuccess && onSuccess();
    },
};