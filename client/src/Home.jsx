// import React, { useEffect, useState } from 'react';
// import openSocket from 'socket.io-client';
// import ReactEcharts from 'echarts-for-react';


// const socket = openSocket('http://localhost:8000');
// // import io from "socket.io-client";
// // const socket = io.connect("http://localhost:8000")


// const Home = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     socket.on('broadcast', (message) => {
//       // console.log(message)
//       const newData = { name: new Date(message.timestamp).
//         toLocaleString('en-US'), 
//         value: [new Date(message.timestamp),
//            Number.parseFloat(message.data).toPrecision(2)] };
//       setData((prevData) => [...prevData, newData].slice(-50));
//     });
  
//     // return () => {
//     //   socket.disconnect();
//     // };
//   }, []);
  

//   const chartOptions = {
//     title: {
//       text: 'Real-time Kafka Stream Visualization',
//     },
//     tooltip: {
//       trigger: 'axis',
//       formatter: function (params) {
//         const date = new Date(params[0].value[0]);
//         return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} : ${params[0].value[1]}`;
//       },
//       axisPointer: {
//         animation: false,
//       },
//     },
//     xAxis: {
//       type: 'time',
//       name: 'Time',
//       splitLine: {
//         show: false,
//       },
//     },
//     yAxis: {
//       type: 'value',
//       name: 'Output Active Power (kW)',
//       splitLine: {
//         show: false,
//       },
//     },
//     series: [
//       {
//         name: 'Power Data',
//         type: 'line',
//         showSymbol: false,
//         hoverAnimation: false,
//         data: data,
//       },
//     ],
//   };

// //   return (
// //     <div style={{ padding: '20px' }}>
// //       <div style={{ padding: '20px', textAlign: 'center' }}>Output active power from solar plant</div>
// //       <ReactEcharts option={chartOptions} style={{ width: '100%', height: '400px' }} />
// //       <h1>{data}</h1>
// //     </div>
// //   );
// // };
// // return (
// //   <div style={{ padding: '20px' }}>
// //     <div style={{ padding: '20px', textAlign: 'center' }}>Output active power from solar plant</div>
// //     <ReactEcharts option={chartOptions} style={{ width: '100%', height: '400px' }} />
// //     <div>
// //       {data.map((item) => (
// //         <div key={item.name}>
// //           {`${item.name}: ${item.value[1]}`}
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // );
// // };

// return (
//   <div className='box'>

  
//   <div style={{ padding: '20px' }}>
//     <div style={{ padding: '20px', textAlign: 'center' }}>Output active power from solar plant</div>
//     <ReactEcharts option={chartOptions} style={{ width: '100%', height: '400px' }} />
//     {/* <div>
//       {data.map((item, index) => (
//         <div key={index}>
//           {`${item.name}: ${item.value[1]}`}
//         </div>
//       ))}
//     </div> */}
//   </div>
//   </div>
// );
// };
// export default Home;

import React, { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import ReactEcharts from 'echarts-for-react';

const socket = openSocket('http://localhost:8000');

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('Event 1'); // Default selected event

  useEffect(() => {
    socket.on('broadcast', (message) => {
      const newData = {
        name: new Date(message.timestamp).toLocaleString('en-US'),
        value: [new Date(message.timestamp), Number.parseFloat(message.data).toPrecision(2)],
        event: message.event,
      };
      setData((prevData) => [...prevData, newData].slice(-50));
    });
  }, []);

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  // Filter data based on the selected event
  const filteredData = data.filter((item) => item.event === selectedEvent);

  const chartOptions = {
    title: {
      text: 'Real-time Kafka Stream Visualization',
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const date = new Date(params[0].value[0]);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} : ${params[0].value[1]}`;
      },
      axisPointer: {
        animation: false,
      },
    },
    xAxis: {
      type: 'time',
      name: 'Time',
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      name: 'Output Active Power (kW)',
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: 'Power Data',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: filteredData,
      },
    ],
  };

  const events = ['Event 1', 'Event 2', 'Event 3']; // List of events

  return (
    <div className='box'>
      <div style={{ padding: '20px' }}>
        <div style={{ padding: '20px', textAlign: 'center' }}>Output active power from solar plant</div>
        <ReactEcharts option={chartOptions} style={{ width: '100%', height: '400px' }} />
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <select value={selectedEvent} onChange={handleEventChange}>
            {events.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Home;
