import numpy as np
from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

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

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available API routes."""
    return (
        "Available Routes:<br/>"
        "/api/v1.0/Industry<br/>"
        "/api/v1.0/Ticker"
    )

@app.route("/api/v1.0/Industry")
def get_industry():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of industry names"""
    # Query all industry names
    results = session.query(industry_groups.industry_name).all()

    session.close()

    # Convert list of tuples into a normal list
    all_industry = list(np.ravel(results))

    return jsonify(all_industry)

@app.route("/api/v1.0/Ticker")
def get_ticker():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of ticker data"""
    # Query all ticker data
    results = session.query(top_ten.company_name, top_ten.industry_id, top_ten.Volume).all()

    session.close()

    # Create a list of dictionaries to store the data
    all_ticker = []
    for company_name, industry_id, volume in results:
        ticker_dict = {
            "company_name": company_name,
            "industry_id": industry_id,
            "volume": volume
        }
        all_ticker.append(ticker_dict)

    return jsonify(all_ticker)

if __name__ == '__main__':
    app.run(debug=True)