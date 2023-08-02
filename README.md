# Kafka-Real-Time-Visualization

A Real Time application that utilizes REST API, Socket.io, Kafka, and React to visualize High Velocity Kafka Streams. 
It consists of a backend server written in Express.js for consuming Kafka messages from topics and a frontend React component for displaying the consumed messages.






https://github.com/kashyapchaganti/Kafka-Real-Time-Visualization/assets/66533610/710e5942-7204-4ed0-b9ef-e8a9009e4634







## Tech Stack

- Kafka
- Socket.io
- Node
- ReactJS

## Introduction 
- So, what is the importance of real-time data visualization? I will give you 3 examples from different domains where analyzing high speed real time data is crucial.

- Financial Services: Real-time visualization with Kafka can be valuable in the financial services industry. For example, stock market data feeds can be streamed into Kafka topics, and real-time visualization tools can process and display this data in a visually appealing and informative manner. Traders and analysts can monitor stock prices, trends, and other relevant metrics in real time, enabling them to make informed decisions quickly.

- Internet of Things (IoT): The IoT generates a massive amount of data from various devices and sensors. Kafka is commonly used as a messaging system to collect, process, and distribute IoT data streams. Real-time visualization tools can consume these Kafka topics and provide visual insights into the status, performance, and patterns of IoT devices. This can be particularly useful in industrial IoT applications, smart cities, and monitoring systems.

- Operational Monitoring and Analytics: Real-time visualization with Kafka can be employed for operational monitoring and analytics in various industries. For instance, in a manufacturing plant, data from sensors and equipment can be streamed into Kafka, and real-time visualization tools can create dashboards and charts to monitor production metrics, machine performance, and identify anomalies or bottlenecks. This allows operators to take immediate action and optimize processes.

## How challenging is it to render high-speed real-time charts?

The field of collecting and storing event data in streams is vast, with various methods available such as Apache Kafka, Confluent's cloud, Azure Event Hub, AWS Kinesis Data Streams, and more. Similarly, there are numerous open-source charting libraries to choose from. However, plotting a real-time chart from these streams can be challenging due to the high speed at which data is collected from different sources.

So, how do we combine the incoming stream with the chart to plot event data in real time?

In this experiment, we will use Fusion Charts and ECharts to directly plot streaming data from Kafka topics onto a browser.

### Theory:
There are two main approaches to solving this problem:

- Refresh the chart at set intervals to fetch the latest event data from the server. Each interval involves fetching historical data. However, this approach faces challenges in selecting the appropriate interval. If it is too short, it results in unnecessary frequent calls to the server. If it is too long, the chart is no longer truly real-time.

- Establish a socket connection between the API server and the browser for real-time and event-based communication. The server emits events to the socket, which are captured by the browser and added to the chart.

Approach:
The second approach, using sockets, is the most practical. Therefore, we will focus on explaining this approach. The charts showcased in the video above plot 10 data points per second.


## Backend
The backend server is responsible for consuming messages from a Kafka topic and exposing an API endpoint to retrieve the last consumed message. It uses the kafkajs library for interacting with Kafka.

## Frontend

The frontend component is a React component that fetches the last consumed message from the backend API and displays its details. It uses the axios library for making API requests and react-bootstrap for styling.

## Kafka Producer

The Kafka producer code is responsible for generating random messages and producing them to any topic. It uses the kafkajs library for interacting with Kafka.

## Note

Make sure to have the backend server running and the frontend component running to consume and display the messages respectively.

## Installation

### Backend Instructions

```
$ npm install

```

```
$ npm start

```

Access the following URL to retrieve the last consumed message:
```
http://localhost:3000/

```


### Frontend Instructions

```
$ npm install

```

```
$ npm run dev

```

Access the following URL to retrieve the last consumed message:
```
http://localhost:8000/

```

## Kafkaproducer Instructions

- start zookeeper server / or use kraft
- start kafka server 
- create a topic of your choice and assign partitions and replication factors 
- start kafka console consumer to crosscheck the data that is flowing to your react app 


```
$ npm install

```

```
$ node producer.js

```






