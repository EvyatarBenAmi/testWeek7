import { question, questionInt } from "readline-sync";
import { searchStock, filterStocksByPrice, OperateOnStock } from "./utils/funcUtils.js";

function main() {
    let run = true
    while (run) {
        const choice = questionInt(` 1.Search for a stock by name or id \n 2.Show all stocks above or below a given price \n 3.Buy or sell a stock \n 4.Exit \n choice: `)
        switch (choice) {
            case 1:
                const identifier = question(`Give me stock by name or id: `)
                console.log(searchStock(identifier))
                break;
            case 2:
                const price = questionInt(`Give me price: `)
                const above = question(`choice: above = true | above = false `)
                console.log(filterStocksByPrice(price,above))
                break;
            case 3:
                const operation = question(`what your choice: “buy” or “sell”`)
                const identifierSelect = question(`Give me stock by name or id: `)
                OperateOnStock(operation, identifierSelect)
                break;
            case 4:
                run = false
        };
    };
};
main()