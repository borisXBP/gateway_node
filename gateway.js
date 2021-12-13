/** @format */

let tcpConnector = require('./connector/tcp-connector');
let tbClient = require('./tb-client/tb-client');
let tcpConverter = require('./converter/converter');
let logger = require('./utils/log4j').getLogger('gateway');

const TCP_HOST = '127.0.0.1'; // 本地TCP网络调试助手的地址
const TCP_PORT = '8888'; // 本地TCP网络调试助手的端口

const TB_PATH = 'mqtt://192.168.10.6:2883'; // 由后端文件写明的网关地址和端口
const Dev_ID = 'RZyQF9Sw37bfgHw5kuk1'; // 设备的访问令牌（必须为网关设备）
const Dev_Token = 'ifgyzUzWat3VA4HMRaNU'; //Gateway_Token （网关的ID）
const IntervalTime = 2 * 1000;

// tb消息处理
let tbMsgHandle = function (topic, msg) {
	logger.info('tb msg:', topic, msg);
};
// tb 连接
tbClient.init(TB_PATH, Dev_Token, tbMsgHandle, () => {
	logger.info('tb client connected');
});

setInterval(() => {
	tbClient.send({
		[Dev_ID]: [
			{
				ts: new Date().getTime(),
				values: {
					temp: 0 + parseInt(Math.random() * 100),
					temp1: 0 + parseInt(Math.random() * 100),
					temp2: 0 + parseInt(Math.random() * 100),
					temp3: 0 + parseInt(Math.random() * 100),
					temp4: 0 + parseInt(Math.random() * 100),
					temp5: 0 + parseInt(Math.random() * 100),
					temp6: 0 + parseInt(Math.random() * 100),
					temp7: 0 + parseInt(Math.random() * 100),
					temp8: 0 + parseInt(Math.random() * 100),
					temp9: 0 + parseInt(Math.random() * 100),
				},
			},
		],
		deviceD: [
			{
				ts: new Date().getTime(),
				values: {
					temp: 0 + parseInt(Math.random() * 100),
					temp1: 0 + parseInt(Math.random() * 100),
					temp2: 0 + parseInt(Math.random() * 100),
					temp3: 0 + parseInt(Math.random() * 100),
					temp4: 0 + parseInt(Math.random() * 100),
					temp5: 0 + parseInt(Math.random() * 100),
					temp6: 0 + parseInt(Math.random() * 100),
					temp7: 0 + parseInt(Math.random() * 100),
					temp8: 0 + parseInt(Math.random() * 100),
					temp9: 0 + parseInt(Math.random() * 100),
				},
			},
		],
	});
}, IntervalTime);

// tcp 消息处理
/* let tcpMsgHandle = function (msg) {
	let tbMsg = tcpConverter.convert(msg);
	logger.info('send:', JSON.stringify(tbMsg));
	tbClient.send(tbMsg);
}; */

// tcp 连接
/* tcpConnector.init(TCP_HOST, TCP_PORT, tcpMsgHandle, () => {
	logger.info('tcp connector listening on' + TCP_HOST + ':' + TCP_PORT);
}); */
