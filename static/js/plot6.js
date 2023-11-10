// Define the URLs
const url_ticker = "http://127.0.0.1:5000/api/v1.0/ticker";
const url_industry_gp = "http://127.0.0.1:5000/api/v1.0/industry_groups";
const url_topten_historic = "http://127.0.0.1:5000/api/v1.0/top_ten_historic";
// const url_fundamental = "http://127.0.0.1:5000/api/v1.0/fundamental";

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

// Function to fetch data from a URL and work with the JSON response
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
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

    // Call the function to populate the Ticker dropdown with the selected industry group
    populateTickerDropdown(industryGroupDropdown.value);
  } catch (error) {
    console.error("Error populating Industry Group dropdown:", error);
  }
}

// Call the function to populate the dropdown when the page loads
populateIndustryGroupDropdown();

// Function to populate the Ticker dropdown
async function populateTickerDropdown(selectedIndustryGroup) {
  try {
    // Use the new URL for fetching ticker data
    const tickerData = await fetchData(url_ticker);

    const filteredTickers = tickerData.filter(ticker => ticker.industry_name === selectedIndustryGroup);

    const tickerDropdown = document.getElementById("ticker");

    // Clear existing options
    tickerDropdown.innerHTML = "";

    filteredTickers.forEach((ticker) => {
      const option = document.createElement("option");
      option.value = ticker.ticker;
      option.textContent = ticker.ticker;
      tickerDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error populating Ticker dropdown:", error);
  }
}

// Call the function to populate the dropdown when the page loads
populateTickerDropdown();

// Function to update stock information based on the selected Ticker
async function updateStockInfo(selectedTicker) {
  try {
    // Use the dynamic URL for fetching fundamental data
    const fundamentalUrl = `http://127.0.0.1:5000/api/v1.0/fundamental/${selectedTicker}`;
    const stockData = await fetchData(fundamentalUrl);
    
    // Assuming the response structure remains the same, adjust these properties accordingly
    const [
      id,
      ticker,
      lastPrice,
      Change,
      volumePerDay,
      volume4wAvg,
      Open,
      dayRange,
      prevClose,
      lastTrade,
      oneWeek,
      oneMonth,
      YTD2023,
      vsSectorOneYr,
      vsASX200OneYr,
      marketCap,
      ASXRank,
      sectorRank,
      sharesIssued,
      Sector,
      similarCompanies,
      EPS,
      DPS,
      bookValuePerShare,
      Breakdown,
      Recommendation,
      lastUpdated,
      PE
    ] = stockData;

    // Update each column with the corresponding information
    document.getElementById('column1').textContent = `Last Price: ${lastPrice}`;
    document.getElementById('column2').textContent = `Change: ${Change}`;
    document.getElementById('column3').textContent = `volumePerDay: ${volumePerDay}`;
    document.getElementById('column4').textContent = `volume4wAvg: ${volume4wAvg}`;
    document.getElementById('column5').textContent = `Open: ${Open}`;
    document.getElementById('column6').textContent = `dayRange: ${dayRange}`;
    document.getElementById('column7').textContent = `prevClose: ${prevClose}`;
    document.getElementById('column8').textContent = `lastTrade: ${lastTrade}`;
    document.getElementById('column9').textContent = `oneWeek: ${oneWeek}`;
    document.getElementById('column10').textContent = `oneMonth: ${oneMonth}`;
    document.getElementById('column11').textContent = `YTD2023: ${YTD2023}`;
    document.getElementById('column12').textContent = `vsSectorOneYr: ${vsSectorOneYr}`;
    document.getElementById('column13').textContent = `vsASX200OneYr: ${vsASX200OneYr}`;
    document.getElementById('column14').textContent = `marketCap: ${marketCap}`;
    document.getElementById('column15').textContent = `ASXRank: ${ASXRank}`;
    document.getElementById('column16').textContent = `sectorRank: ${sectorRank}`;
    document.getElementById('column17').textContent = `sharesIssued: ${sharesIssued}`;
    document.getElementById('column18').textContent = `Sector: ${Sector}`;
    document.getElementById('column19').textContent = `similarCompanies: ${similarCompanies}`;
    document.getElementById('column20').textContent = `EPS: ${EPS}`;
    document.getElementById('column21').textContent = `DPS: ${DPS}`;
    document.getElementById('column22').textContent = `bookValuePerShare: ${bookValuePerShare}`;
    document.getElementById('column23').textContent = `Breakdown: ${Breakdown}`;
    document.getElementById('column24').textContent = `Recommendation: ${Recommendation}`;
    document.getElementById('column25').textContent = `lastUpdated: ${lastUpdated}`;
    document.getElementById('column26').textContent = `PE: ${PE}`;
    
      
    // Continue updating other columns as needed
  } catch (error) {
    console.error("Error updating stock information:", error);
  }
}



      

async function updateTimeSeriesChart(selectedTicker) {
  try {
    // Fetch data for the time series chart from the URL
    const historicData = await fetchData(url_topten_historic);

    // Arrays to store xData and yData
    const xDataList = [];
    const yDataList = [];

    // Loop through the data (assuming it's in sets of 8 as you mentioned)
    for (let i = 0; i < historicData.length; i += 8) {
      const ticker = historicData[i + 1];
      const data = historicData.slice(i + 2, i + 8);

      // Check if the current ticker matches the selectedTicker
      if (selectedTicker === ticker) {
        const xData = data[0];
        const yData = data[1];

        // Add xData and yData to the respective lists
        xDataList.push(xData);
        yDataList.push(yData);
      }
    }

    // Create chartData for Plotly
    const chartData = [
      {
        x: xDataList,
        y: yDataList,
        type: 'scatter',
        mode: 'lines',
        name: selectedTicker, // You can customize the series name
      },
    ];

    // Define layout with smaller font size for x-axis labels
    const timeSeriesLayout = {
      title: '5 Years Historical Weekly Prices',
      xaxis: {
        tickangle: -45, // Rotate the x-axis labels by -45 degrees
        automargin: true, // Automatically adjust margins to fit labels
      },
      yaxis: { title: 'Price' },
    };

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


const barChartLayout = {
  barmode: 'group',
  title: 'Top Ten Companies Comparison',
  xaxis: { title: 'Company' },
  yaxis: { title: 'Value' }
};


// Add an event listener to the Industry Group dropdown
document.getElementById("industryGroup").addEventListener("change", function() {
  populateTickerDropdown(this.value);
});

// Call your functions to initialize the charts
updateStockInfo('ARB'); // Replace with a default value if needed
updateTimeSeriesChart('ARB'); // Replace with a default value if needed
updateBarCharts('Automobiles & Components'); // Replace with a default value if needed
updateStockInfo('ARB'); // Replace with a default value if needed
