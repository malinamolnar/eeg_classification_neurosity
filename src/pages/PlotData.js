import React, { useState, useEffect, Component } from "react";
import Plot from 'react-plotly.js';
import { navigate } from "@reach/router";

import { notion, useNotion } from "../services/notion";
import { Nav } from "../components/Nav";

class PlotData extends React.Component {
    render() {
      return (
        <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [2, 6, 3],
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
            {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
          ]}
          layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
        />
      );
    }
  }

export default PlotData