const amqp = require("amqplib");
const { rabbitmqUri, queueName } = require('../config');

class RabbitMQ {
    constructor() {
        try {
            amqp.connect(rabbitmqUri).then(conn => {
                conn.createChannel().then(chan => {
                    this.channel = chan
                    this.channel.assertQueue(queueName, { durable: true }).then(() => {
                        console.log('Queue Ready ..');
                    });
                })
            }).catch((err) => {
                console.log('Error connecting to RabbitMQ: ', err);
            });

        } catch (err) {
            console.log('There is an Error: ', err);
        }
    }

    async queueJob(data) {
        try {
            this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true })
        } catch (err) {
            console.error(err)
        }
    }
}
module.exports = new RabbitMQ()