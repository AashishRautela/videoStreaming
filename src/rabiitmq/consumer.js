const amqp = require('amqplib');  // Import amqplib to interact with RabbitMQ

// Consumer function to listen to the queue
async function listenToQueue() {
    try {
        const connection = await amqp.connect('amqp://localhost');  // Establish connection to RabbitMQ server
        const channel = await connection.createChannel();  // Create a channel to communicate with RabbitMQ
        const queue = 'userRegistrationQueue';  // The queue to listen for messages

        await channel.assertQueue(queue, { durable: true });  // Ensure the queue exists (durable means it survives restarts)

        console.log('Waiting for messages in queue:', queue);

        // Set up a consumer to listen to the queue
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const message = msg.content.toString();  // Convert the message buffer into a string
                console.log('Received message:', message);  // Log the message (you can replace this with any logic)
                channel.ack(msg);  // Acknowledge that the message has been processed
            }
        }, { noAck: false });  // Set noAck to false so we can explicitly acknowledge the message after processing

    } catch (error) {
        console.error('Error in Consumer:', error);
    }
}

module.exports = listenToQueue;
