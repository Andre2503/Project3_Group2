function createGaugeChart(washingFrequency) {
  // Set up gauge chart data with the requested color format
  var gauge_data = [
    {
      type: 'indicator',
      mode: 'gauge+number',
      gauge: {
        axis: { range: [0, 9], tickmode: 'array', tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
        bar: { color: 'darkred' },
        steps: [
          { range: [0, 1], color: 'rgba(255, 255, 0, 0.25)' },  // Light yellow
          { range: [1, 2], color: 'rgba(170, 255, 0, 0.25)' },
          { range: [2, 3], color: 'rgba(85, 255, 0, 0.25)' },
          { range: [3, 4], color: 'rgba(0, 255, 0, 0.25)' },  // Light green
          { range: [4, 5], color: 'rgba(0, 255, 0, 0.5)' },
          { range: [5, 6], color: 'rgba(0, 255, 0, 0.75)' },
          { range: [6, 7], color: 'rgba(0, 255, 0, 1)' },    // Dark green
          { range: [7, 8], color: 'rgba(0, 100, 0, 0.25)' },
          { range: [8, 9], color: 'rgba(0, 0, 0, 0.25)' },   // Black
        ],
        shape: 'angular',
      },
    },
  ];

  // Set up gauge chart layout
  var gauge_layout = {
    width: 400,
    height: 400,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: 'white',
    annotations: [
      {
        text: '<b>Belly Button Washing Frequency</b>',  // Title
        font: { size: 18, color: 'black', weight: 'bold' },
        x: 0.5,  // Center-align the title
        xref: 'paper',
        y: 0.94,  // Adjust the y position for title
        yref: 'paper',
        showarrow: false,
      },
      {
        text: 'Scrubs per Week',  // Text below the title
        font: { size: 14 },
        x: 0.5,  // Center-align the text
        xref: 'paper',
        y: 0.86,  // Adjust the y position for text
        yref: 'paper',
        showarrow: false,
      },
    ],
  };

  // Create the gauge chart
  Plotly.newPlot('gauge', gauge_data, gauge_layout);
}

function updateGaugeChart(washingFrequency) {
  var update = {
    value: washingFrequency,
  };

  Plotly.update('gauge', update);
}

// Sample usage:
createGaugeChart(3);
