import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import { notion, useNotion } from "../services/notion";
import { Nav } from "../components/Nav";
//import { Stream } from "../components/Stream";
import axios from 'axios';

export function Stream() {
  const { user } = useNotion();
  const [calm, setCalm] = useState(0);
  const [valenceNeg, setValNeg] = useState(0);
  const [valencePos, setValPos] = useState(0);

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

    var arr = [];
    // var count = 0;
    const subscription = notion.brainwaves("raw").subscribe((brainwaves) => {

      // count = count + 1;
      // console.log(count);

      var ts = []
      for (let step =0; step<8; step++){
        ts.push(brainwaves.data[step][0]);
      }
      arr.push(ts);
  
      if (arr.length == 200) {

        const body = {
              "input_data": [arr]
            }
      

        const jsonString = JSON.stringify(body);

        const url = 'https://ml-dissertation.germanywestcentral.inference.ml.azure.com/score'
        const api_key = 'b6JSyKan6UkZMafdoCHw1DxWWubTeY3B'
        axios.post(url, jsonString, {headers:{
          'Content-Type':'application/json',
          'Authorization': ('Bearer '+ api_key),
          'azureml-model-deployment':'lstm-cnn-collected-data-model'
        }
        }).then(function (response) {
          setValNeg(response.data[0][0]);
          setValPos(response.data[0][1]);
          console.log("Probability for class 0 (negative emotion): ", response.data[0][0]);
          console.log("Probability for class 1 (positive emotion): ", response.data[0][1]);
        }).catch(function (error) {
          console.log(error);
        });

        // console.log(arr);
        
        arr = [];
      }
      });

    // var arr = []
    // const subscription = notion.brainwaves("raw").subscribe((brainwaves) => {

    //   while(arr.length < 200) {
    //     var ts = []
    //     for (let step =0; step<8; step++){
    //       ts.push(brainwaves.data[step][0]);
    //     }
    //     arr.push(ts);
    //   }
    //   if (arr.length == 200) {

    //     arr = [];
    //   }

    //   });

  
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
          frameRate: 50,    // data points are drawn 50 times every second

          onRefresh: function(chart) {

            const subscription = notion.brainwaves("raw").subscribe((brainwaves) => {

            chart.data.datasets.forEach((dataset, index) => {
              dataset.data.push({
                x: Date.now(),
                y: brainwaves.data[index][0]  //only the first value from each 6 milliseconds
              })
            });

            });
            chart.update('quiet');

          },
          }
      }
      ]
  }
  };

  return (
<main>
        <div>
        <h3>Streaming EEG signals from Crown Neurosity</h3>
        <p>Probability for negative valence: {valenceNeg}</p>
        <p>Probaility for positive valence: {valencePos}</p>
        </div>

        <div>
        {/* <canvas ></canvas> */}
        <Line data={data} options={options} />
    </div>

</main>



  );
}
