
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
        "/api/v1.0/top_ten<br/>"
        "/api/v1.0/industry_groups<br/>"
        "/api/v1.0/top_ten_historic<br/>"
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





    # Create a list of dictionaries to store the data
    industry_name = []
    for company_name, industry_id, market_cap in results:
        industry_name_dict = {
            "company_name": company_name,
            "industry_id": industry_id,
            "market_cap": market_cap
        }
        all_industry_groups.append( industry_name_dict)

    return jsonify(all_industry_group)

if __name__ == '__main__':
    app.run(debug=True)


