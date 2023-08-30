import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import { notion, useNotion } from "../services/notion";
import { Nav } from "../components/Nav";
//import { Stream } from "../components/Stream";

export function Stream() {
  const { user } = useNotion();
  const [calm, setCalm] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const data = {
    datasets: [
        {
          label: "CP3",
          lineTension: 0,
          fill: -1,
          borderColor: 'rgba(45, 146, 144, 0.8)'
        },
        {
          label: "C3",
          lineTension: 0,
          fill: -1,
          borderColor: 'rgba(69, 89, 59, 0.8)'
        },
        {
          label: "F5",
          lineTension: 0,
          fill: -1,
          borderColor: 'rgba(151, 39, 245, 0.8)'
        }
        ,
        {
          label: "PO3",
          lineTension: 0,
          fill: -1,
          borderColor: 'rgba(245, 104, 39, 0.8)'
        },
        {
          label: "PO4",
          lineTension: 0,
          fill: -1,
          borderColor: 'rgba(245, 207, 39, 0.8)'
        },
        {
          label: "F6",
          lineTension: 0,
          fill: -1,
          borderColor: 'rgba(39, 245, 233, 0.8)'
        },
        {
          label: "C4",
          lineTension: 0,
          fill: -1,
          borderColor: 'rgba(70, 39, 245, 0.8)'
        },
        {
          label: "CP4",
          lineTension: 0,
          fill: -1,
          borderColor: 'rgba(245, 40, 145, 0.8)'
        }

    ]
    };


  const options = {
  scales: {
      xAxes: [
      {
          type: "realtime",
          realtime: {

          duration: 2000,  // data in the past 20000 ms will be displayed
          refresh: 1000,    // onRefresh callback will be called every 1000 ms
          delay: 1000,      // delay of 1000 ms, so upcoming values are known before plotting a line
          pause: false,     // chart is not paused
          ttl: undefined,   // data will be automatically deleted as it disappears off the chart
          frameRate: 30,    // data points are drawn 30 times every second

          onRefresh: function(chart) {

            const subscription = notion.brainwaves("raw").subscribe((brainwaves) => {

              // for (let i = 0; i < 8; i++) {
              //   // Code to be repeated
              //   chart.data.datasets[0].data.push({
              //     x: Date.now(),
              //     y: brainwaves.data[0][i]
              //     });
              // }
            chart.data.datasets.forEach((dataset, index) => {
              dataset.data.push({
                x: Date.now(),
                y: brainwaves.data[index][0]  //only the first value from each 6 milliseconds
              })
            });
            // chart.data.datasets[0].data.push({
            // x: Date.now(),
            // y: brainwaves.data[0][0]
            // });

            });
            chart.update('quiet');

          },
          }
      }
      ]
  }
  };

  return (

    <div>
        {/* <canvas ></canvas> */}
        <div>Streaming data</div>
        <Line data={data} options={options} />
    </div>


  );
}
