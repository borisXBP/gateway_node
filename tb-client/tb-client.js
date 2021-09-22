let mqtt = require("mqtt");
let logger = require("../utils/log4j").getLogger("tb-client");

module.exports = {
    client: null,
    connected: false,

    init: function (path,gatewayToken, onReceive, onSuccess){
        let vm = this;

        if(!path || !gatewayToken){
            logger.error("TbPath or GatewayToken error!");
            return;
        }

        vm.client = mqtt.connect(path,{
            username: gatewayToken,
        });

        vm.client.on("connect", () => {
            vm.connected = true;
            onSuccess && onSuccess();
        });

        vm.client.on("message", (topic, msg) => {
            vm.connected = true;
            onReceive && onReceive(topic, msg);
        });

        vm.client.on("close", () => {
            vm.connected = true;
            logger.info("tb client close");
        });

        vm.client.on("error",(err) => {
            vm.connected = false;
            logger.error("tb client error", err);
        });

    },
    //发送方法
    send: function (msg){
        if(!this.connected){
            return;
        }
        this.client.publish("v1/gateway/telemetry",JSON.stringify(msg));
    }
}