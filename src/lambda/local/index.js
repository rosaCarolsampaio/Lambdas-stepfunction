
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ['localhost:9092']
});
const producer = kafka.producer();

 async function sendmessage() {
	await producer.connect();
	await producer.send({
		topic: 'poc',
		messages: [
			{
				ID: 123,
				value: '{nome: "local", apelido:"POC"}'
			},
		],
	});
	await producer.disconnect();
}

sendmessage();

module.exports.producer = async event =>  {
	try{
		return await sendmessage;
	} catch (error){
      console.log('the error was: ', error)
	}
}