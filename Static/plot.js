function loadSectorPlot(sector) {
    fetch(`/api/v1.0/PlotData/${sector}`)
      .then(response => response.json())
      .then(data => {
        var layout = {
          title: 'Ticker Volume by Sector',
          xaxis: {
            title: 'Ticker',
          },
          yaxis: {
            title: 'Volume'
          }
        };
        Plotly.newPlot('plot', [data], layout);
      })
      .catch(error => console.error('Error loading plot data:', error));
  }
  
  