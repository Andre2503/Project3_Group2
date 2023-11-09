// Define the URL for the JSON data (Belly Button Biodiversity dataset)
// const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to populate the dropdown with industry groups
function populateDropdown(data) {
  const dropdown = d3.select('#selIndustryGp');
  data.names.forEach(industryGp => {
    dropdown.append('option').attr('value', industryGp).text(industryGp);
  });
}

// Function to handle changes in the dropdown
function optionChanged(selectedIndustryGp) {
  d3.json(url_industry_gp)
    .then(function(data) {
      // Assuming your data structure has samples and metadata properties
      const samples = data.samples;
      const metadata = data.metadata;

      // Assuming there's a property named 'id' in your samples and metadata
      const selectedSampleData = samples.find(sample => sample.id === selectedIndustryGp);
      const selectedMetadata = metadata.find(item => item.id === parseInt(selectedIndustryGp));

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
  d3.json(url_industry_gp)
    .then(function(data) {
      populateDropdown(data);
      optionChanged(data.names[0]); // Choose the first industry group by default
    })
    .catch(function(error) {
      console.error("Error fetching data:", error);
    });
}

// Initialize the dashboard
init();
