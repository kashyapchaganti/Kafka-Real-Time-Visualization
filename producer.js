const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client);

const topic = 'streaming-data';

producer.on('ready', () => {
  console.log('Kafka producer is ready');

  // Simulate sending data every second
  setInterval(sendData, 1000);
});

producer.on('error', (error) => {
  console.error('Error in Kafka producer:', error);
});

function sendData() {
  const message = generateMessage();
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

function generateMessage() {
  // Generate sample data (replace this with your real data source)
  const randomPower = Math.random() * 100;
  const timestamp = new Date().toISOString();

  return {
    timestamp: timestamp,
    data: randomPower,
  };
}
