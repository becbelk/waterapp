
const levelAmountTable = [
    { edge: 100, price: 6.3, tax: 2.35, difference: 100, index: 1 },
    { edge: 220, price: 20.48, tax: 7.64, difference: 120, index: 2 },
    { edge: 328, price: 34.65, tax: 12.93, difference: 108, index: 3 },
    { edge: 100000000, price: 40.95, tax: 15.28, difference: 0, index: 4 }
]

const maxLevel = 4;

const inscriptionTax = 200;
const flatRateAmount = 5000;



const calculateDetailedInvoice = (consumer, context) => {
    index = findIndex(consumer.consumptions, context.periode);
    if (consumer.consumptions[index].isFlatRated)  {
         return {
             oldC: 0,
             newC: 0,
             flatRateAmount:flatRateAmount,
             diff: 0,
             edges: [0, 0, 0, 0],
             amounts: [0, 0, 0, 0],
             taxes: [0, 0, 0, 0],
             totalTaxes: 0,
             totalAmounts: flatRateAmount,
             totalToPay: flatRateAmount,
         };
          
 
     }else{
        let consumption = consumer.consumptions[index].newConsumption - consumer.consumptions[index].oldConsumption;
        let previous = { edge: 0, price: 0, tax: 0, difference: 0, index: 0 };
        const detailedInvoice = {
            oldC:consumer.consumptions[index].oldConsumption,
            newC: consumer.consumptions[index].newConsumption,
            diff: consumption,
            inscriptionTax: inscriptionTax,
            edges: [],
            amounts: [],
            flatRateAmount:0,
            taxes: [],
            totalTaxes: 0,
            totalAmounts: 0,
            totalToPay: 0,
        };

        var current = levelAmountTable[0];
        let currentTax = 0, currentAmount = 0;


        for (index = 0; index < levelAmountTable.length; index++) {
            current = levelAmountTable[index];
            if (current.edge > consumption) {
                leveledConsumption = Number(consumption - (previous.edge ?? 0)).toFixed(2);
                detailedInvoice.edges.push(leveledConsumption);
                currentAmount = current.price * leveledConsumption;
                detailedInvoice.amounts.push(Number(currentAmount).toFixed(2));
                currentTax = current.tax * leveledConsumption;
                detailedInvoice.taxes.push(Number(currentTax).toFixed(2));
                detailedInvoice.totalTaxes += currentTax;
                detailedInvoice.totalAmounts += currentAmount;
                detailedInvoice.totalToPay += Number(detailedInvoice.totalAmounts + detailedInvoice.totalTaxes + inscriptionTax).toFixed(2);
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
        }
    }

}


const findIndex = (consumptions, periode) => {//todo: should be in binary search
    //console.log('[*] function {findIndex} search for [periode] of consumption of water: [',periode,']')
    for (let i = consumptions.length - 1;
        i >= 0; i--) {
        if (consumptions[i].periode == periode) {
    //         console.log('[*] function {findIndex}-->[index] found is: [', i,']');
            return i;
        }
        if (consumptions[i].periode != periode && i === 0) {
   //         console.log('[*] error while searching for periode :[', periode, ']... periode sould be inserted');
            return -1;
        }
    };

}
module.exports = { calculateDetailedInvoice, levelAmountTable,findIndex }

