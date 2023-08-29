import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import { notion, useNotion } from "../services/notion";
//import { Stream } from "../components/Stream";

export function Stream() {
  const { user } = useNotion();
  const [calm, setCalm] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const subscription = notion.brainwaves("raw").subscribe((brainwaves) => {
      console.log(brainwaves);
    });


    return () => {
      subscription.unsubscribe();
    };
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
                data.datasets[0].data.push({
                x: Date.now(),
                y: Math.random() * 100
                });
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
