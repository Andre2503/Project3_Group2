// Define the URL for the JSON data (Belly Button Biodiversity dataset)
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to populate the dropdown with sample IDs
function populateDropdown(data) {
  const dropdown = d3.select('#selDataset');
  data.names.forEach(sampleID => {
    dropdown.append('option').attr('value', sampleID).text(sampleID);
  });
}

// Function to create the horizontal bar chart
function createBarChart(sampleData) {
  // Sort the data to get the top 10 OTUs
  const sortedData = sampleData.sample_values.slice(0, 10).reverse();
  const otuLabels = sampleData.otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();
  const hovertext = sampleData.otu_labels.slice(0, 10).reverse();

  // Create the bar chart
  // const bar_trace = {
  //   x: sortedData,
  //   y: otuLabels,
  //   text: hovertext,
  //   type: 'bar',
  //   orientation: 'h'
  // };

  // const bar_layout = {
  //   title: '<b>Top 10 OTUs Found</b>',
  //   yaxis: {
  //     tickmode: 'linear'
  //   }
  // };

  // Plotly.newPlot('bar', [bar_trace], bar_layout);

    // Create the bar chart
    const bar2_trace = {
      x: sortedData,
      y: otuLabels,
      text: hovertext,
      type: 'line',
      orientation: 'v'
    };
  
    const bar2_layout = {
      title: '<b>Top 10 OTUs Found</b>',
      yaxis: {
        tickmode: 'linear'
      }
    };

  Plotly.newPlot('bar2', [bar2_trace], bar2_layout);


}

// Function to create the bubble chart
function createBubbleChart(sampleData) {
  // Create the bubble chart
  const bubble_trace = {
    x: sampleData.otu_ids,
    y: sampleData.sample_values,
    text: sampleData.otu_labels,
    mode: 'markers',
    marker: {
      size: sampleData.sample_values,
      color: sampleData.otu_ids,
      colorscale: 'Earth'
    }
  };

  const bubble_layout = {
    title: '<b>Sample Biodiversity</b>',
    xaxis: { title: 'OTU ID' }
  };

  Plotly.newPlot('bubble', [bubble_trace], bubble_layout);
}

// Function to display metadata
function displayMetadata(metadata) {
  const panel = d3.select('#sample-metadata');
  panel.html(''); // Clear existing metadata

  // Iterate through each key-value pair in the metadata and display it
  Object.entries(metadata).forEach(([key, value]) => {
    panel.append('p').text(`${key}: ${value}`);
  });
}

// Function to handle changes in the dropdown
function optionChanged(selectedSampleID) {
  d3.json(url)
    .then(function(data) {
      const samples = data.samples;
      const metadata = data.metadata;

      const selectedSampleData = samples.find(sample => sample.id === selectedSampleID);
      const selectedMetadata = metadata.find(item => item.id === parseInt(selectedSampleID));

      createBarChart(selectedSampleData);
      createBubbleChart(selectedSampleData);
      displayMetadata(selectedMetadata);

      // Update the gauge chart
      updateGaugeChart(selectedMetadata.wfreq);
    })
    .catch(function(error) {
      console.error("Error fetching data:", error);
    });
}


// Function to initialize the dashboard
function init() {
  d3.json(url)
    .then(function(data) {
      populateDropdown(data);
      optionChanged(data.names[0]); // Choose the first sample ID by default
    })
    .catch(function(error) {
      console.error("Error fetching data:", error);
    });
}

// Initialize the dashboard
init();
