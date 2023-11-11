# ASX Stock Selector Dashboard

## Overview

The ASX Stock Selector is an interactive dashboard designed to present stock information in a readable and user-friendly manner. It allows users to explore the top 10 companies within selected industry groups and analyze their performance based on various financial metrics.

## Features

- **Industry Group Selection**: Users can choose from a dropdown menu to select an industry group.
- **Company Selection**: A second dropdown enables the selection of an individual company ticker within the chosen industry group.
- **Interactive Charts**: The dashboard dynamically displays a line chart showing the historical price of the selected stock over 5 years. Additionally, bar charts compare the Market Cap, EPS, Dividend per Share, and P/E Ratio of the top 10 companies in the selected industry.

## Methodology

- **Data Sources**: Utilized an ASX listed companies CSV for industry group and company data, and the `yfinance` Python library for historic stock prices. Web scraping techniques gathered fundamental data for each company.
- **Backend**: Developed using Python and Flask, with SQLAlchemy for database interactions.
- **Frontend**: Constructed with HTML, JavaScript (utilizing Chart.js for the time series line chart), and CSS.
- **Database**: `ASX_top_ten_db` includes tables for industry_group, top_ten, historic, and fundamentals.

## How It Works

### Backend

- The Flask application serves as the backbone, facilitating data retrieval and API endpoint creation. You must run the script `name of script` in order to access the full functionality and interactivity of the dashboard. 
- SQLAlchemy is used for querying the relational database, enabling efficient data management.

### Frontend

- HTML structures the webpage, featuring a header, dropdown menus and charts.
- JavaScript, with the help of Plotly and Chart.js, manages data fetching from the Flask API and updates the dashboard.
- CSS styles the webpage for a polished and user-friendly interface.

# Getting Started

To run the dashboard locally, follow these steps:

### Set up the environment:
1. Ensure Python is installed on your system.
2. Clone the repository from GitHub to your local machine.

### Run the Flask application:
1. Navigate to the project directory in your terminal.
2. Execute the command: `python app_solution_from_Zonia_v1_mod.py`. This will start the Flask server.

### Access the Dashboard:
1. Open a web browser and navigate to `http://localhost:5000/` (or the URL provided in the terminal).
2. The `index12.html` file will render the dashboard.

## Repository Structure

Here is an overview of the file structure and contents of this repository:

| Category  | File/Folder | Description |
|-----------|-------------|-------------|
| **Notebooks** | `01_ASX_Top10_Dataframes_Historic.ipynb` | Notebook for identifying top ten industries per group |
|  | `02_Creating_DataBase_from_Zonia.ipynb` | Document for creating the database |
|  | `Retrieve_ASX_Ticker_Final2.ipynb` | Notebook for scraping Yahoo Finance data |
| **Scripts** | `app_solution_from_Zonia_v1_mod.py` | Flask application and API path generator script |
| **HTML** | `index12.html` | HTML structure of the dashboard |
| **Resources** | `02_ASX_Fundamental_Final_Clean.csv` | Web scraped data from Yahoo Finance |
|  | `Industry_Groups.csv` | Industry groups classified by ASX |
|  | `Top_ten_asx.db` | Database created with SQLAlchemy |
|  | `Top_ten_historic_5y.csv` | Historical stock price data |
|  | `Top_ten_with_inudstryID.csv` | Industry IDs for data relationship enhancement |
| **Static** | `/js/Plot_12.js` | JavaScript for dashboard updates and API interactions |
|  | `/css/Styles12.css` | CSS for webpage styling |
| **Libraries** | `Chart.js` | [Chart.js](https://cdn.jsdelivr.net/npm/chart.js) library used for plotting TimeSeries |
|  | `Luxon` | [Luxon](https://cdn.jsdelivr.net/npm/luxon@2.1.1/build/global/luxon.min.js) library used for date display control |
| **Images** | `ASX_top_ten_ERD.jpg` | Entity Relationship Diagram of the database |


## Conclusion

The ASX Stock Selector Dashboard showcases the power of combining data science with web development to create a practical and interactive tool for stock analysis. 
