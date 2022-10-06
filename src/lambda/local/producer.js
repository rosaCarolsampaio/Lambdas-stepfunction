
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ['localhost:9092']
});
const producer = kafka.producer();

async function sendmessage(event, context) {
	await producer.connect();
	await producer.send({
		topic: 'poc',
		messages: [
			{
				ID: 123,
				value: '{nome: "local", apelido:"segundou"}'
			},
		],
	});
	await producer.disconnect();
}
sendmessage()
module.exports.prod = event => {
	sendmessage()
};
