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
        label: "Dataset 1",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0,
        fill: -1
        }
    ]
    };


  const options = {
  scales: {
      xAxes: [
      {
          type: "realtime",
          realtime: {
          onRefresh: function(chart) {

            const subscription = notion.brainwaves("raw").subscribe((brainwaves) => {
              // setSignals(sig);
              // console.log(brainwaves.data[0]);
              // setSignals();
              for (let i = 0; i < 8; i++) {
                // Code to be repeated
                chart.data.datasets[0].data.push({
                  x: Date.now(),
                  y: brainwaves.data[0][i]
                  });
              }


            });
            chart.update('quiet');

          },
          delay: 2000
          }
      }
      ]
  }
  };

  return (



    <div>
        <Line data={data} options={options} />
    </div>


  );
}
