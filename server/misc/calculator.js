
const global =require('./global')
const calculateDetailedInvoice = (consumer) => {
    if (consumer.isFlatRated)  {
         return {
             oldC: 0,
             newC: 0,
             flatRateAmount:global.flatRateAmount,
             diff: 0,
             edges: [0, 0, 0, 0],
             amounts: [0, 0, 0, 0],
             taxes: [0, 0, 0, 0],
             totalTaxes: 0,
             totalAmounts: global.flatRateAmount,
             totalToPay: global.flatRateAmount,
         }; 
     }else{
        let consumption = consumer.newConsumption - consumer.oldConsumption;
        let previous = { edge: 0, price: 0, tax: 0, difference: 0, index: 0 };
        const detailedInvoice = {
            oldC:consumer.oldConsumption,
            newC: consumer.newConsumption,
            diff: consumption,
            inscriptionTax: global.inscriptionTax,
            edges: [],
            amounts: [],
            flatRateAmount:0,
            taxes: [],
            totalTaxes: 0,
            totalAmounts: 0,
            totalToPay: 0,
        };
console.log('detailedInvoice=',detailedInvoice)
        var current = global.levelAmountTable[0];
        let currentTax = 0, currentAmount = 0;


        for (index = 0; index < global.levelAmountTable.length; index++) {
            current = global.levelAmountTable[index];
            if (current.edge > consumption) {
                leveledConsumption = Number(consumption - (previous.edge ?? 0)).toFixed(2);
                detailedInvoice.edges.push(leveledConsumption);
                currentAmount = current.price * leveledConsumption;
                detailedInvoice.amounts.push(Number(currentAmount).toFixed(2));
                currentTax = current.tax * leveledConsumption;
                detailedInvoice.taxes.push(Number(currentTax).toFixed(2));
                detailedInvoice.totalTaxes += currentTax;
                detailedInvoice.totalAmounts += currentAmount;
                detailedInvoice.totalToPay += Number(detailedInvoice.totalAmounts + detailedInvoice.totalTaxes + global.inscriptionTax).toFixed(2);
                detailedInvoice.inscriptionTax = Number(200).toFixed(2);

                return detailedInvoice;
            } else {

                detailedInvoice.edges.push(Number(current.difference).toFixed(2));
                currentAmount = current.price * current.difference;
                detailedInvoice.amounts.push(Number(currentAmount).toFixed(2));
                currentTax = current.tax * current.difference;
                detailedInvoice.taxes.push(Number(currentTax).toFixed(2));
                detailedInvoice.totalTaxes += currentTax;
                detailedInvoice.totalAmounts += currentAmount;
            }
            previous = current;
            console.log('detailedInvoice=',detailedInvoice)
        }
    }

}

module.exports = { calculateDetailedInvoice }

