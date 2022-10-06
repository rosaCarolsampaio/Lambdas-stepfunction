const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' })

async function readMessage() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'poc', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
      console.log("message read: \n")
    },
  })
}

readMessage();

module.exports.consumer = event =>  {
  readMessage();
}
