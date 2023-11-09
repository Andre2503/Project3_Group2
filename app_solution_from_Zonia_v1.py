
import numpy as np
from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from flask_cors import CORS  # This will allow your front-end code to make requests
                             # to the Flask app running on a different port.

#################################################
# Database Setup
#################################################
engine = create_engine('sqlite:///Resources/top_ten_asx.db')

# Reflejar la base de datos en un modelo automap
Base = automap_base()
Base.prepare(engine, reflect=True)

# Crear referencias a las tablas
industry_groups = Base.classes.industry_groups
top_ten = Base.classes.top_ten

#################################################
# Flask Setup
#################################################

app = Flask(__name__)
CORS(app)     # this is added with the from flask_cors import CORS commands
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})  # added to do fundamentals

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available API routes."""
    return (
        "Available Routes:<br/>"
        "/api/v1.0/top_ten<br/>"
        "/api/v1.0/industry_groups<br/>"
        "/api/v1.0/top_ten_historic<br/>"
        "/api/v1.0/fundamental<br/>"

    )


@app.route("/api/v1.0/top_ten")
def get_top_ten():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of top_ten data"""
    # Query all top_ten data
    results = session.query(top_ten.ticker,top_ten.company_name, top_ten.market_cap, top_ten.industry_id).all()

    session.close()

     # Convert list of tuples into a normal list
    all_top_ten = list(np.ravel(results))

    return jsonify(all_top_ten)


@app.route("/api/v1.0/industry_groups")
def get_industry_groups():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of industry names"""
    # Query all industry names
    results = session.query(industry_groups.industry_name).all()

    session.close()

    # Convert list of tuples into a normal list
    all_industry_groups = list(np.ravel(results))

    return jsonify(all_industry_groups)


@app.route("/api/v1.0/top_ten_historic")
def get_top_ten_historic():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of top_ten_historic"""
    # Reflejar la tabla top_ten_historic
    top_ten_historic = Base.classes.top_ten_historic

    # Query all top_ten_historic data
    results = session.query(
        top_ten_historic.id,
        top_ten_historic.Ticker,
        top_ten_historic.Date,
        top_ten_historic.Open,
        top_ten_historic.High,
        top_ten_historic.Low,
        top_ten_historic.Close,
        top_ten_historic.Volume
    ).all()

    session.close()

    # Convert list of tuples into a normal list
    all_top_ten_historic = list(np.ravel(results))

    return jsonify(all_top_ten_historic)


@app.route("/api/v1.0/fundamental/<ticker>")
def get_fundamental_by_tickers(ticker):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of fundamental"""
    # Reflejar la tabla fundamental
    fundamental = Base.classes.fundamental

    # Query all fundamental data for the given Ticker
    results = session.query(
        fundamental.id,
        fundamental.Ticker,
        fundamental.lastPrice,
        fundamental.Change,
        fundamental.volumePerDay,
        fundamental.volume4wAvg,
        fundamental.Open,
        fundamental.dayRange,
        fundamental.prevClose,
        fundamental.lastTrade,
        fundamental.oneWeek,
        fundamental.oneMonth,
        fundamental.YTD2023,
        fundamental.vsSectorOneYr,
        fundamental.vsASX200OneYr,
        fundamental.marketCap,
        fundamental.ASXRank,
        fundamental.sectorRank,
        fundamental.sharesIssued,
        fundamental.Sector,
        fundamental.similarCompanies,
        fundamental.EPS,
        fundamental.DPS,
        fundamental.bookValuePerShare,
        fundamental.Breakdown,
        fundamental.Recommendation,
        fundamental.lastUpdated,
        fundamental.PE,
    ).filter(fundamental.Ticker == ticker).all()

    session.close()

    # Convert list of tuples into a normal list
    all_fundamental = list(np.ravel(results))

    return jsonify(all_fundamental)





if __name__ == '__main__':
    app.run(debug=True)


