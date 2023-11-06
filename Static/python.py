import numpy as np
from flask import Flask, jsonify
from sqlalchemy import create_engine, func
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

# Database Setup
engine = create_engine('sqlite:///Resources/top_ten_asx.db')
Base = automap_base()
Base.prepare(engine, reflect=True)

# Save references to the tables
IndustryGroups = Base.classes.industry_groups
TopTen = Base.classes.top_ten

# Flask Setup
app = Flask(__name__)

# Flask Routes
@app.route("/")
def welcome():
    return (
        "Available Routes:<br/>"
        "/api/v1.0/Industry<br/>"
        "/api/v1.0/Tickers/<industry_name>"
    )

@app.route("/api/v1.0/Industry")
def get_industry():
    session = Session(engine)
    results = session.query(IndustryGroups.industry_name).all()
    session.close()
    all_industry = list(np.ravel(results))
    return jsonify(all_industry)

@app.route("/api/v1.0/Tickers/<industry_name>")
def get_tickers_by_industry(industry_name):
    session = Session(engine)
    results = (
        session.query(TopTen.company_name, TopTen.symbol, TopTen.market_cap)
        .join(IndustryGroups, IndustryGroups.id == TopTen.industry_id)
        .filter(IndustryGroups.industry_name == industry_name)
        .order_by(TopTen.market_cap.desc())
        .limit(10)
        .all()
    )
    session.close()

    all_tickers = [
        {"company_name": name, "symbol": symbol, "market_cap": market_cap}
        for name, symbol, market_cap in results
    ]
    return jsonify(all_tickers)

if __name__ == '__main__':
    app.run(debug=True)


























