-- create Industry_Groups table
DROP TABLE IF EXISTS Industry_Groups CASCADE;
CREATE TABLE  Industry_Groups (
	industry_name VARCHAR (80)NOT NULL,
	industry_id SERIAL NOT NULL,
    	PRIMARY KEY (industry_name)
);


-- create ASX_Top10_Industry table
DROP TABLE IF EXISTS ASX_Top10_Industry CASCADE;
CREATE TABLE  ASX_Top10_Industry (
	ticker VARCHAR (10)NOT NULL,
	company_name VARCHAR (90)NOT NULL,
	industry_gp VARCHAR (120)NOT NULL,
	market_cap  NUMERIC,
		FOREIGN KEY (industry_gp) REFERENCES Industry_Groups (industry_name),
		PRIMARY KEY (ticker)
);


-- create top_ten_historic_5y table
DROP TABLE IF EXISTS top_ten_historic_5y CASCADE;
CREATE TABLE top_ten_historic_5y (
	Ticker VARCHAR (10)NOT NULL,
	Date VARCHAR (50) NOT NULL,
	Open NUMERIC NOT NULL,
	High NUMERIC NOT NULL,
	Low NUMERIC NOT NULL,
	Close NUMERIC NOT NULL,
	Adj_Close NUMERIC NOT NULL,
	Volume NUMERIC,
		FOREIGN KEY (Ticker) REFERENCES ASX_Top10_Industry (ticker)
	
		
);




SELECT * FROM Industry_Groups;
SELECT * FROM ASX_Top10_Industry;
SELECT * FROM top_ten_historic_5y;


-- ticker, campany mane, market_cap ,volumen of each List the industry

SELECT ind.ticker, ind.company_name, ind.industry_gp, ind.market_cap, his.Volume,his.Date
FROM ASX_Top10_Industry AS ind
LEFT JOIN top_ten_historic_5y as his
ON ind.ticker = his.ticker
ORDER BY ind.ticker;


