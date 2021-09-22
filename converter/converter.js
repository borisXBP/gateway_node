module.exports = {
    convert: function(data){
        let tcpMsg = JSON.parse(data.toString());

        let tbMsg = {};
        tbMsg[tcpMsg.device] = [{
            ts: new Date().getTime(),
        values:{
            temp: tcpMsg.temp,
        },
        }];
        return tbMsg;
    },
};