import React, { useState } from "react";
import "./index.css";

export default function StockData() {

    const [date, setDate] = useState("");
    const [stockData, setStockData] = useState();

    const handleChange = (event) => {
        setDate(event.target.value);

    }

    const handleClick = (event) => {

        event.preventDefault();
        let dateParam = '';

        if (date.charAt(0) === '0') {
            dateParam = date.subString(1);
        } else {
            dateParam = date;
        }

        fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${dateParam}`)
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                    setStockData(data.data)
                    setDate("");
                }
            }).catch(error => {
                console.log(error)
            })

    }

    return (
        <div className="layout-column align-items-center mt-50">
            <section className="layout-row align-items-center justify-content-center">
                <input type="text" className="large" placeholder="5-January-2000" id="app-input" value={date} onChange={handleChange} data-testid="app-input" />
                <button onClick={handleClick} className="" id="submit-button" data-testid="submit-button">Search</button>
            </section>

            { stockData && stockData.length > 0 &&
                <ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data">
                    {/* <li className="py-10"></li> */}
                    <li>Open: {stockData ? stockData[0]["open"] : ""}</li>
                    <li>Close: {stockData ? stockData[0]["close"] : ""}</li>
                    <li>High: {stockData ? stockData[0]["high"] : ""}</li>
                    <li>Low: {stockData ? stockData[0]["low"] : ""}</li>
                </ul>
            }

            {
                stockData && stockData.length === 0 ? <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result">No Results Found</div> : null
            }

        </div >
    );
}
