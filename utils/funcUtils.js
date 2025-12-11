import { questionInt } from "readline-sync";
import { stockMarket } from "../dataBais/data.js"

export function editTime() {
    stockMarket.lastUpdated = new Date()
};
export function searchStock(identifier) {
    return stockMarket.stocks.filter((stock) => stock.id === identifier || stock.name === identifier);
};
export function filterStocksByPrice(givenPrice, above) {
    if (above) {
        return stockMarket.stocks.filter((stock) => stock.currentPrice > givenPrice)
    }
    else {
        return stockMarket.stocks.filter((stock) => stock.currentPrice < givenPrice)
    };
};
export function OperateOnStock(operation, identifier) {
    const stockSelect = searchStock(identifier)
    if (stockSelect.length && (operation === `buy` || operation === `sell`)) {
        const howUnits = questionInt(`How many units to buy or sell: \n`)
        updateAvailableStock(operation, stockSelect, howUnits)
        updatePriceSelect(stockSelect,operation)
        updatePricesCategory(stockSelect, operation)
    } else console.log(`Error identifier`);
};
export function updatePriceSelect(stockSelect,operation) {
    const price = stockSelect.currentPrice
    stockSelect.previousPrices.push(price)
    if (operation === `buy`) stockSelect.currentPrice = price * 1.05
    else if (operation === `sell`) stockSelect.currentPrice = price * 0.95
    editTime()
};
export function updatePricesCategory(stockSelect, operation) {
    stockMarket.stocks.forEach((stock) => {
        const price = stock.currentPrice;
        if (stock.category === stockSelect.category) {
            if (operation === `buy`) {
                stock.previousPrices.push(price);
                stock.currentPrice = price * 1.01;
            } else if (operation === `sell`) {
                stock.previousPrices.push(price);
                stock.currentPrice = price * 0.99;
            };
        };
    });
    editTime()
};
export function updateAvailableStock(operation, stockSelect, units) {
    if (operation === `buy`) stockSelect.availableStocks -= units
    else if (operation === `sell`) stockSelect.availableStocks += units
    editTime()
};