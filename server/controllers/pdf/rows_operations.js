const stringOp=require('../../misc/string_op.js');
const calculator=require('../../misc/calculator.js');

exports. add = (acc, _element) => {
    // addition between umbers in acc and neumbers in element ==> acc
    acc.cons_level_0 =Number(acc.cons_level_0)+Number(_element.cons_level_0);
    acc.cons_level_1 =Number(acc.cons_level_1)+Number(_element.cons_level_1);
    acc.cons_level_2 =Number(acc.cons_level_2)+Number(_element.cons_level_2);
    acc.cons_level_3 =Number(acc.cons_level_3)+Number(_element.cons_level_3);

    acc.amount_0 =Number(acc.amount_0)+Number(_element.amount_0);
    acc.amount_1 =Number(acc.amount_1)+Number(_element.amount_1);
    acc.amount_2 =Number(acc.amount_2)+Number(_element.amount_2);
    acc.amount_3 =Number(acc.amount_3)+Number(_element.amount_3);

    acc.tax_0 =Number(acc.tax_0)+Number(_element.tax_0);
    acc.tax_1 =Number(acc.tax_1)+Number(_element.tax_1);
    acc.tax_2 =Number( acc.tax_2)+Number(_element.tax_2);
    acc.tax_3 =Number(acc.tax_3)+Number(_element.tax_3);

    acc.totalToPay =Number(acc.totalToPay)+Number(_element.totalToPay);
    acc.totalAmounts =Number(acc.totalAmounts)+Number(_element.totalAmounts);
    acc.totalTaxes =Number(acc.totalTaxes)+Number(_element.totalTaxes);
    acc.inscriptionTax =Number(acc.inscriptionTax)+Number(_element.inscriptionTax);
    return acc;
}



exports.elementOf = (list, i,context) => {
///choose an element i in list[list]
// if it is null should be 0
//and calculate invoice of a consumption
    let _element = {
        no: list[i].no,
        watermeterId: list[i].watermeterId,
        name: stringOp.ara(list[i].name),
        address:  stringOp.ara(list[i].address),
    }
    let _consumptions = list[i].consumptions;
    let _consumption =_consumptions [this.findIndex( _consumptions,context.periode)];
//console.log('_consumption=',_consumption)
    _element.old = Number(_consumption.oldConsumption).toFixed(0);
    _element.new = Number(_consumption.newConsumption).toFixed(0);

    let _difference = _consumption.newConsumption - _consumption.oldConsumption;
console.log('_difference=',_difference)
    let _detailedInvoice = calculator.calculateDetailedInvoice(_difference);
console.log('_detailedInvoice=',_detailedInvoice)
    _element.cons_level_0 = Number(_detailedInvoice.edges[0] ?? 0);
    _element.cons_level_1 =Number( _detailedInvoice.edges[1] ?? 0);
    _element.cons_level_2 = Number(_detailedInvoice.edges[2] ?? 0);
    _element.cons_level_3 =Number( _detailedInvoice.edges[3] ?? 0);

    _element.amount_0 = Number(_detailedInvoice.amounts[0] ?? 0);
    _element.amount_1 = Number(_detailedInvoice.amounts[1] ?? 0);
    _element.amount_2 = Number(_detailedInvoice.amounts[2] ?? 0);
    _element.amount_3 = Number(_detailedInvoice.amounts[3] ?? 0);

    _element.tax_0 = Number(_detailedInvoice.taxes[0] ?? 0);
    _element.tax_1 = Number(_detailedInvoice.taxes[1] ?? 0);
    _element.tax_2 = Number(_detailedInvoice.taxes[2] ?? 0);
    _element.tax_3 = Number(_detailedInvoice.taxes[3] ?? 0);
    _element.totalToPay = Number(_detailedInvoice.totalToPay).toFixed(2);
    _element.totalAmounts = Number(_detailedInvoice.totalAmounts).toFixed(2);
    _element.totalTaxes = Number(_detailedInvoice.totalTaxes).toFixed(2);
    _element.inscriptionTax = Number(_detailedInvoice.inscriptionTax).toFixed(2);
    return _element;
}


exports.rowFormatted = (element) => {
    //formatt a row to be represented as 2 dicimal digits fixed
    let _element = element;
    _element.cons_level_0 = Number(element.cons_level_0).toFixed(2);
    _element.cons_level_1 = Number(element.cons_level_1).toFixed(2);
    _element.cons_level_2 = Number(element.cons_level_2).toFixed(2);
    _element.cons_level_3 = Number(element.cons_level_3).toFixed(2);

    _element.amount_0 = Number(element.amount_0).toFixed(2);
    _element.amount_1 = Number(element.amount_1).toFixed(2);
    _element.amount_2 = Number(element.amount_2).toFixed(2);
    _element.amount_3 = Number(element.amount_3).toFixed(2);

    _element.tax_0 = Number(element.tax_0).toFixed(2);
    _element.tax_1 = Number(element.tax_1).toFixed(2);
    _element.tax_2 = Number(element.tax_2).toFixed(2);
    _element.tax_3 = Number(element.tax_3).toFixed(2);

    _element.totalToPay = Number(element.totalToPay).toFixed(2);
    _element.totalAmounts = Number(element.totalAmounts).toFixed(2);
    _element.totalTaxes = Number(element.totalTaxes).toFixed(2);
    _element.inscriptionTax = Number(element.inscriptionTax).toFixed(2);
    return _element;
}
exports.rowAssignement=(a,b)=>{
    a.cons_level_0 = Number(b.cons_level_0);
    a.cons_level_1 = Number(b.cons_level_1);
    a.cons_level_2 = Number(b.cons_level_2);
    a.cons_level_3 = Number(b.cons_level_3);

    a.amount_0 = Number(b.amount_0);
    a.amount_1 = Number(b.amount_1);
    a.amount_2 = Number(b.amount_2);
    a.amount_3 = Number(b.amount_3);

    a.tax_0 = Number(b.tax_0);
    a.tax_1 = Number(b.tax_1);
    a.tax_2 = Number(b.tax_2);
    a.tax_3 = Number(b.tax_3);

    a.totalToPay = Number(b.totalToPay);
    a.totalAmounts = Number(b.totalAmounts);
    a.totalTaxes = Number(b.totalTaxes);
    a.inscriptionTax = Number(b.inscriptionTax);
    
}

