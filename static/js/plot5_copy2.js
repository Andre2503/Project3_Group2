// Define the URLs
const url_topten = "http://127.0.0.1:5000/api/v1.0/top_ten";
const url_industry_gp = "http://127.0.0.1:5000/api/v1.0/industry_groups";
const url_topten_historic = "http://127.0.0.1:5000/api/v1.0/top_ten_historic";
# const url_fundamental = "http://127.0.0.1:5000/api/v1.0/fundamental";
const url_fundamental = `http://127.0.0.1:5000/api/v1.0/fundamental/${selectedTicker}`;


const stockInformationOrder = [
  'lastPrice',
  'Change',
  'Bid_Ask',
  'volumePerDay',
  'volume4wAvg',
  'Open',
  'dayRange',
  'prevClose',
  'lastTrade',
  'oneWeek',
  'oneMonth',
  'YTD2023',
  'vsSectorOneYr',
  'vsASX200OneYr',
  'marketCap',
  'ASXRank',
  'sectorRank',
  'sharesIssued',
  'Sector',
  'similarCompanies',
  'EPS',
  'DPS',
  'bookValuePerShare',
  'Breakdown',
  'Recommendation',
  'lastUpdated',
  'PE',
];


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


// Function to populate the Industry Group dropdown
async function populateIndustryGroupDropdown() {
  try {
    const industryGroups = await fetchData(url_industry_gp);

    const industryGroupDropdown = document.getElementById("industryGroup");

    // Clear existing options
    industryGroupDropdown.innerHTML = "";

    industryGroups.forEach((group) => {
      const option = document.createElement("option");
      option.value = group;
      option.textContent = group;
      industryGroupDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error populating Industry Group dropdown:", error);
  }
}

// Call the function to populate the dropdown when the page loads
populateIndustryGroupDropdown();

// Function to populate the Ticker dropdown
async function populateTickerDropdown() {
  try {
    const tickerData = await fetchData(url_topten);

    const tickerDropdown = document.getElementById("ticker");

    // Clear existing options
    tickerDropdown.innerHTML = "";

    // Start the loop from the 0th index and increment by 4 in each iteration
    for (let i = 0; i < tickerData.length; i += 4) {
      const ticker = tickerData[i];
      const option = document.createElement("option");
      option.value = ticker;
      option.textContent = ticker;
      tickerDropdown.appendChild(option);
    }
  } catch (error) {
    console.error("Error populating Ticker dropdown:", error);
  }
}

// Call the function to populate the dropdown when the page loads
populateTickerDropdown();

// Function to update stock information based on the selected Ticker
async function updateStockInfo(selectedTicker) {
  try {
    const stockData = await fetchData(`${url_fundamental}/${selectedTicker}`);
    console.log('Stock Data:', stockData);

    if (selectedTicker in stockData) {
      const selectedStock = stockData[0]; // Assuming the first item in the array contains the data for the selected Ticker
      const columnsContainer = document.getElementById('stockInformation').getElementsByClassName('columns-container')[0];

      // Clear existing content in columns
      for (let i = 1; i <= 3; i++) {
        const column = document.getElementById(`column${i}`);
        column.innerHTML = '';
      }

      let columnIndex = 1;

      stockInformationOrder.forEach((key) => {
        const value = selectedStock[key];
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${key}:</strong> <span>${value}</span>`;

        // Append to the current column
        const currentColumn = document.getElementById(`column${columnIndex}`);
        currentColumn.appendChild(listItem);

        // Move to the next column (and wrap around if needed)
        columnIndex = (columnIndex % 3) + 1;
      });
    } else {
      console.error(`Data for ${selectedTicker} not found.`);
    }
  } catch (error) {
    console.error('Error updating stock information:', error);
  }
}




// Function to update the time series chart based on the selected Ticker
async function updateTimeSeriesChart(selectedTicker) {
  try {
    // Fetch data for the time series chart from the URL
    const historicData = await fetchData(url_topten_historic);

    // Extract x and y data from the response (assuming specific fields in your API response)
    const xData = historicData.Date; // Modify based on your API response structure
    const yData = historicData.Close; // Modify based on your API response structure

    const chartData = [
      {
        x: xData,
        y: yData,
        type: 'scatter',
        mode: 'lines',
        name: 'Ticker Data',
      },
    ];

    // Update the time series chart with the fetched data
    Plotly.newPlot('tickerChart', chartData, timeSeriesLayout);
  } catch (error) {
    console.error('Error updating time series chart:', error);
  }
}

// Function to update the bar charts based on the selected Industry Group
async function updateBarCharts(selectedIndustryGroup) {
  try {
    const fundamentalData = await fetchData(url_fundamental);

    const companies = fundamentalData.companies; // Modify based on your API response structure
    const marketCapValues = fundamentalData.marketCap; // Modify based on your API response structure
    const epsValues = fundamentalData.eps; // Modify based on your API response structure
    const peValues = fundamentalData.pe; // Modify based on your API response structure

    // Update market cap data
    const marketCapChartData = [
      { x: companies, y: marketCapValues, type: 'bar', name: 'Market Cap (in billions USD)' }
    ];

    // Update EPS data
    const epsChartData = [
      { x: companies, y: epsValues, type: 'bar', name: 'EPS (USD)' }
    ];

    // Update PE data
    const peChartData = [
      { x: companies, y: peValues, type: 'bar', name: 'PE Ratio' }
    ];

    // Update the bar charts with the fetched data
    Plotly.newPlot('marketCapChart', marketCapChartData, barChartLayout);
    Plotly.newPlot('epsChart', epsChartData, barChartLayout);
    Plotly.newPlot('peChart', peChartData, barChartLayout);
  } catch (error) {
    console.error("Error updating bar charts:", error);
  }
}

// Define your layout for the charts
const timeSeriesLayout = {
  title: 'Ticker Time Series',
  xaxis: { title: 'Time' },
  yaxis: { title: 'Value' }
};

const barChartLayout = {
  barmode: 'group',
  title: 'Top Ten Companies Comparison',
  xaxis: { title: 'Company' },
  yaxis: { title: 'Value' }
};

// Call your functions to initialize the charts
updateStockInfo('BHP Group'); // Replace with a default value if needed
updateTimeSeriesChart('BHP Group'); // Replace with a default value if needed
updateBarCharts('Materials'); // Replace with a default value if needed
