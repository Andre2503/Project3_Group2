// Define the URLs
// const url_industry_gp = "http://127.0.0.1:5000/api/v1.0/industry_groups";
// const url_topten = "http://127.0.0.1:5000/api/v1.0/top_ten";
const url_topten_historic = "http://127.0.0.1:5000/api/v1.0/top_ten_historic";
const url_fundamental = "http://127.0.0.1:5000/api/v1.0/fundamental"; // Removed `${selectedTicker}`

// Function to fetch data from the API
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`API error: ${data.error}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    // You might want to handle this error more gracefully in your application
  }
}

// Sample data for the time series chart
const timeSeriesData = [
  { x: [1, 2, 3, 4, 5], y: [30, 20, 10, 25, 15], type: 'scatter', mode: 'lines', name: 'Ticker Data' }
];

const timeSeriesLayout = {
  title: 'Ticker Time Series',
  xaxis: { title: 'Time' },
  yaxis: { title: 'Value' }
};

// Sample data for the bar charts
const marketCapData = [
  { x: ['Company A', 'Company B', 'Company C', 'Company D', 'Company E', 'Company F', 'Company G', 'Company H', 'Company I', 'Company J'], y: [100, 80, 70, 60, 55, 50, 45, 40, 35, 30], type: 'bar', name: 'Market Cap (in billions USD)' }
];

const epsData = [
  { x: ['Company A', 'Company B', 'Company C', 'Company D', 'Company E', 'Company F', 'Company G', 'Company H', 'Company I', 'Company J'], y: [2.5, 3, 3.2, 2.8, 2.9, 3.5, 3.1, 2.7, 3.3, 3.0], type: 'bar', name: 'EPS (USD)' }
];

const peData = [
  { x: ['Company A', 'Company B', 'Company C', 'Company D', 'Company E', 'Company F', 'Company G', 'Company H', 'Company I', 'Company J'], y: [20, 25, 22, 19, 20, 18, 21, 23, 20, 21], type: 'bar', name: 'PE Ratio' }
];

const barChartLayout = {
  barmode: 'group',
  title: 'Top Ten Companies Comparison',
  xaxis: { title: 'Company' },
  yaxis: { title: 'Value' }
};

// Function to populate the Industry Group dropdown
async function populateIndustryGroupDropdown() {
  try {
    // Load industry group data from the JSON file using fetchData
    const industryGroups = await fetchData('file:///C:/Users/GPEL_HPENVY/Desktop/Project3_Group2/Resources/industryGroup.json');
    console.log('Industry Groups:', industryGroups);

    const industryGroupDropdown = document.getElementById('industryGroup');

    // Clear existing options
    industryGroupDropdown.innerHTML = '';

    industryGroups.forEach((group) => {
      const option = document.createElement('option');
      option.value = group;
      option.textContent = group;
      industryGroupDropdown.appendChild(option);
    });
  } catch (error) {
    console.error('Error populating Industry Group dropdown:', error);
  }
}

// Call the function to populate the dropdown when the page loads
populateIndustryGroupDropdown();


// Function to update stock information based on the selected Ticker
function updateStockInfo(selectedTicker) {
  // Fetch stock information for the selected Ticker
  // Replace the following with your data retrieval logic or API calls

  // Sample data (replace with actual data)
  const stockInfo = {
      lastPrice: 150.00,
      change: 5.00,
      bidAsk: '150.50 / 150.60',
      // Add more stock information properties here
  };

  // Update the placeholders with actual stock information
  document.getElementById('lastPrice').textContent = stockInfo.lastPrice;
  document.getElementById('change').textContent = stockInfo.change;
  document.getElementById('bidAsk').textContent = stockInfo.bidAsk;
  // Update more placeholders as needed
}

// Function to update the time series chart based on the selected Ticker
function updateTimeSeriesChart(selectedTicker) {
  // Fetch data for the selected Ticker or generate data dynamically
  // Replace the sample data with your actual data or data retrieval logic
  // For example, you can use AJAX to fetch data from an API.

  // Sample data update for the time series chart
  // Here, we're just updating the chart with the sample data
  Plotly.newPlot('tickerChart', timeSeriesData, timeSeriesLayout);
}

// Function to update the bar charts based on the selected Industry Group
function updateBarCharts(selectedIndustryGroup) {
  // Fetch data for Market Cap, EPS, and PE based on the selected Industry Group
  // Replace the sample data with your actual data or data retrieval logic
  // For example, you can use AJAX to fetch data from an API.

  // Sample data update for Market Cap
  Plotly.newPlot('marketCapChart', marketCapData, barChartLayout);

  // Sample data update for EPS
  Plotly.newPlot('epsChart', epsData, barChartLayout);

  // Sample data update for PE
  Plotly.newPlot('peChart', peData, barChartLayout);
}

// Initial chart display for the time series chart and bar charts (you can set default values here)
updateStockInfo('AAPL');
updateTimeSeriesChart('AAPL');
updateBarCharts('technology');
