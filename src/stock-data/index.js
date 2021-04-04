import React, { useState } from "react";
import "./index.css";

export default function StockData() {

    const [date, setDate] = useState("");
    const [stockData, setStockData] = useState();
    const [hidden, setHidden] = useState(true);

    const handleChange = (event) => {

        setDate(event.target.value);

    }

    const handleSubmit = (event) => {

        event.preventDefault();
        let dateParam = '';

        if (date.charAt(0) === '0') {
            dateParam = date.subString(1);
        } else {
            dateParam = date;
        }

        fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${dateParam}`)
            .then(response => {
                if (response.data.length > 0) {
                    setStockData(response.data[0])
                } else {
                    setHidden(false);
                }
            }).catch(error => {
                console.log(error)
            })

    }

    return (
        <div className="layout-column align-items-center mt-50">
            <section className="layout-row align-items-center justify-content-center">
                <input type="text" className="large" placeholder="5-January-2000" id="app-input" value={date} onChange={handleChange} data-testid="app-input" />
                <button onSubmit={handleSubmit} className="" id="submit-button" data-testid="submit-button">Search</button>
            </section>
            <ul hidden={stockData ? false : true} className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data">
                <li className="py-10"></li>
                <li>Open: {stockData["open"]}</li>
                <li>Close: {stockData["close"]}</li>
                <li>High: {stockData["high"]}</li>
                <li>Low: {stockData["low"]}</li>
            </ul>
            <div hidden={hidden} className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result"></div>
        </div>
    );
}
