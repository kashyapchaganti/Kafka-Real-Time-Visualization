const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { Kafka } = require('kafkajs');
const retry = require('retry');

const app = express();
const server = http.createServer(app);
const cors = require("cors")
app.use(cors())
const io = socketIO(server,{
        cors:{
            origin:"http://localhost:3000",
            methods:["GET","POST"],
        },
    });



const kafka = new Kafka({
  clientId: 'my-consumer-app',
  brokers: ['localhost:9092'],
});

const topic = 'streaming-data';
const groupId = 'my-consumer-group';

const consumer = kafka.consumer({ groupId });

const run = async () => {
  const operation = retry.operation({
    retries: 5, // Number of retries
    factor: 2, // Exponential backoff factor
    minTimeout: 1000, // Minimum timeout for the first retry (in milliseconds)
    maxTimeout: 30000, // Maximum timeout for retries (in milliseconds)
    randomize: true, // Randomize the timeouts to spread retries
  });

  operation.attempt(async (currentAttempt) => {
    try {
      await consumer.connect();
      await consumer.subscribe({ topic, fromBeginning: true });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const data = JSON.parse(message.value.toString());
          console.log('Received data:', data);
          // Emit the data to connected clients via Socket.IO
          io.emit('broadcast', data);
        },
      });
    } catch (error) {
      if (operation.retry(error)) {
        return;
      }
      console.error('Error occurred:', error);
    }
  });
};

run();

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
