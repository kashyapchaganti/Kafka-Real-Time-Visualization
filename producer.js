// const kafka = require('kafka-node');

// const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
// const producer = new kafka.Producer(client);

// const topic = 'streaming-data';

// producer.on('ready', () => {
//   console.log('Kafka producer is ready');

//   // Simulate sending data every half second
//   setInterval(sendData, 100);
// });

// producer.on('error', (error) => {
//   console.error('Error in Kafka producer:', error);
// });

// function sendData() {
//   const message = generateMessage();
//   const payload = [
//     {
//       topic: topic,
//       messages: JSON.stringify(message),
//     },
//   ];

//   producer.send(payload, (error, data) => {
//     if (error) {
//       console.error('Error sending message:', error);
//     } else {
//       console.log('Message sent:', data);
//     }
//   });
// }

// function generateMessage() {
//   // Generate sample data (replace this with your real data source)
//   const randomPower = Math.random() * 100;
//   const timestamp = new Date().toISOString();

//   return {
//     timestamp: timestamp,
//     data: randomPower,
//   };
// }

const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client);

const topic = 'streaming-data';

const events = ['Event 1', 'Event 2', 'Event 3']; // List of events

producer.on('ready', () => {
  console.log('Kafka producer is ready');

  // Simulate sending data every half second for each event
  events.forEach((event) => {
    setInterval(() => sendData(event), 1000);
  });
});

producer.on('error', (error) => {
  console.error('Error in Kafka producer:', error);
});

function sendData(event) {
  const message = generateMessage(event);
  const payload = [
    {
      topic: topic,
      messages: JSON.stringify(message),
    },
  ];

  producer.send(payload, (error, data) => {
    if (error) {
      console.error('Error sending message:', error);
    } else {
      console.log('Message sent:', data);
    }
  });
}

function generateMessage(event) {
  // Generate sample data (replace this with your real data source)
  const randomPower = Math.random() * 100;
  const timestamp = new Date().toISOString();

  return {
    timestamp: timestamp,
    data: randomPower,
    event: event,
  };
}
