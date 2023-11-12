# ASX Stock Selector Dashboard
Github repository at: [https://github.com/Andre2503/Project3_Group2.git](https://github.com/Andre2503/Project3_Group2.git)

## Table of Contents

1. [Introduction](#introduction)
   1. [Overview](#overview)
   2. [Objective](#objective)
2. [Getting Started](#getting-started)
   1. [Prerequisites](#prerequisites)
   2. [Installation](#installation)
   3. [Running the Application](#running-the-application)
3. [Features](#features)
4. [Approach](#approach)
   1. [Methodology](#methodology)
   2. [Structure](#structure)
   3. [Scripts](#scripts)
5. [Repository Structure](#repository-structure)
6. [Data Sources and Copyright](#data-sources-and-copyright)
   1. [Data Sources](#data-sources)
   2. [Copyright Notice](#copyright-notice)
7. [Conclusion](#conclusion)
8. [References](#references)


## Introduction

### Overview

The ASX Stock Selector Dashboard is an advanced, interactive tool designed to present comprehensive stock information. It offers users a user-friendly platform to explore and analyze the top 10 companies in various industry groups based on market capitalization. Unique features include data updates, interactive charts, and detailed company analysis.

### Objective

Our objective is to combine the power of data science and web development to create a practical, insightful tool for stock market analysis.
## Getting Started

### Prerequisites

- Python (version 3.x recommended)
- yfinance library - for running the file `01_ASX_Top10_Dataframes_Historic`
- ([Flask-Cors](https://pypi.org/project/Flask-Cors/)) installation 
- A modern web browser

### Installation

To get started with the dashboard:

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/Andre2503/Project3_Group2.git
   ```
2. (Optional) Set up a virtual environment in the project directory.
3. Install the required dependencies:
   ```
   pip install flask-cors
   ```

### Running the Application

1. Open your terminal and navigate to the project directory.
2. Activate the virtual environment, if you have set one up.
3. Start the Flask application:
   ```
   python app_solution.py
   ```
4. Access the dashboard through the `index.html` in your web browser.


## Features

- Industry Group Selection: Users can choose from a dropdown menu to select an industry group.
- Company Selection: A second dropdown enables the selection of an individual company ticker within the chosen industry group.
- Interactive Charts: Dynamic display of historical stock prices, selected stock's fundamental information and comparison charts for various financial metrics within the selected industry group.

## Approach

### Methodology

**Data Acquisition and Analysis:**
1. **Data Downloading:** We sourced a comprehensive list of ASX-listed companies, including their market capitalization and industry groups, directly from the ASX website.
2. **Selection of Top Companies:** Using market capitalization, we identified the leading companies within each industry group.
3. **Scraping Fundamental Data:** For each of these top companies, we extracted fundamental data from various web sources, storing this information in a dedicated database.

**Data Processing and Database Creation:**
4. **Historical Stock Price Retrieval:** We utilized the `yfinance` Python library to obtain historical stock price data for each company in our top 10 list.
5. **ETL Process:** The data gathered underwent an Extract, Transform, Load (ETL) process, primarily using Python's pandas library.
6. **Database Schema and Creation:** We designed a database schema and created four relational tables. The database was constructed using SQLAlchemy.

**Application Development and Deployment:**
7. **API Development:** A Flask application was developed to generate APIs. These APIs allow for various queries, either targeting specific tables or joining them to fetch necessary data for our dashboard.
8. **Front-End Development:** The dashboard's front end was crafted using HTML for structure, JavaScript for interactivity, and CSS for formatting and aesthetics.


### Structure

- **Backend:** Flask application with SQLAlchemy for database management.
- **Frontend:** HTML for structure, JavaScript (including libraries like Plotly and Chart.js) for dynamic features, and CSS for styling.


## Scripts 

- `index.html`: Main HTML file that structures the web dashboard.
- `01_ASX_Top10_Dataframes_Historic.ipynb`: Jupyter notebook for retrieving top 10 companies per industry group and historical stock data.
- `02_Retrive_ASX_Ticker_Fundamentals.ipynb`: Script for scraping fundamental data of ASX-listed companies.
- `03_Creating_DataBase.ipynb`: Notebook detailing the creation of the database structure.
- `app_solution.py`: The Flask application script.

## Repository Structure

- **Root Directory:** Contains the main application files like `index.html`, Jupyter notebooks (`01_ASX_Top10_Dataframes_Historic.ipynb`, etc.), and the Flask script `app_solution`.
- **Images Directory:** Includes assets like `ASX_top_ten_ERD.jpg`.
- **Static Directory:** Stores scripts, stylesheets, and other static files.
- **Resources Directory:** Contains datasets and the database file.
![image](https://github.com/Andre2503/Project3_Group2/assets/120079788/5ff4e40f-486b-4218-a1b2-243d5f006aea)


## Data Sources and Copyright

### Data Sources

The data used in this dashboard is sourced from the following:

- **Australian Securities Exchange (ASX)**: Used to identify the top 10 companies per sector. Available at: [ASX Directory](https://www.asx.com.au/markets/trade-our-cash-market/directory).
- **Yahoo Finance**: Financial information for each ticker was retrieved using the `yfinance` library, which provides a reliable method of data scraping.
- **Market Index**: For comprehensive financial details per ticker, we scraped data from [Market Index](https://www.marketindex.com.au/asx-listed-companies).


### Copyright Notice

The data presented in this dashboard is the property of the respective data providers, including the Australian Securities Exchange and Yahoo Finance. The information provided by this dashboard is for informational/ educational purposes only and is not intended for trading or investment advice. We do not hold any responsibility for financial decisions made based on the information provided by our dashboard. 

## Conclusion

This dashboard exemplifies the integration of data science and web technologies in creating a user-friendly and informative tool for stock market analysis. We look forward to further enhancing its capabilities and adding more features in the future.

## References

- Codes and approaches inspired by lecture notes and various online resources.
- [1] Iterate over a Dictionary [https://buzzcoder.gitbooks.io/codecraft-javascript/content/object/iterate-over-a-dictionary.html](https://buzzcoder.gitbooks.io/codecraft-javascript/content/object/iterate-over-a-dictionary.html)
- [2] D3 Removing Elements [https://stackoverflow.com/questions/16260285/d3-removing-elements](https://stackoverflow.com/questions/16260285/d3-removing-elements)
- [3] Math.max() [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max#](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max#)
- [4] yfinance Pyhton Tutorial (2023) [https://analyzingalpha.com/yfinance-python]


