const amqp = require('amqplib');  // Import amqplib for interacting with RabbitMQ

// Producer function to send a message to the RabbitMQ queue
async function sendMessageToQueue(message) {
    try {
        const connection = await amqp.connect('amqp://localhost');  // Establish connection to RabbitMQ server
        const channel = await connection.createChannel();  // Create a channel in RabbitMQ
        const queue = 'userRegistrationQueue';  // Name of the queue where we send the message

        await channel.assertQueue(queue, { durable: true });  // Ensure the queue exists (durable means the queue survives server restarts)

        // Send the message (the user data or log info) to the queue
        channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

        console.log('Message sent to the queue:', message);  // Log the message that was sent

        await channel.close();  // Close the channel
        await connection.close();  // Close the connection
    } catch (error) {
        console.error('Error sending message to queue:', error);
    }
}

module.exports = sendMessageToQueue;
