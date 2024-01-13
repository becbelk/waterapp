const Consumer = require('../../model/consumer');
const pdf = require('./print/pdf_controller');
const fs = require('fs')
const path = require('path')
const global = require('../../misc/global')



exports.printePage = async (req, res) => {
    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';
    //todo: add query
    res.render('read/print/main');
}


exports.printInvoices = async (req, res) => {
    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';

    const list = await Consumer.aggregate([
         {$unwind:"$consumptions"},
        {$match:{saved:true,"consumptions.periode":global.context.periode}},
        {$project: {
                 no: 1,
                 name: 1,
                 address: 1,
                 watermeterId: 1,
                 oldConsumption: "$consumptions.oldConsumption",
                 newConsumption: "$consumptions.newConsumption",
                 isFlatRated: "$consumptions.isFlatRated",
                }//project
        },
        {$sort:{address:1,no:1}}
    ]);
    console.log('[*] call {printInvoices}   [list.count] = [', list.length, ']')
    pdf.printInvoicesInPDF(list, global.context,res)
}

exports.printList = async (req, res) => {
    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';

    const list = await Consumer.aggregate([
        {$unwind:"$consumptions"},
       {$match:{saved:true,"consumptions.periode":global.context.periode}},
       {$project: {
                no: 1,
                name: 1,
                address: 1,
                watermeterId: 1,
                oldConsumption: "$consumptions.oldConsumption",
                newConsumption: "$consumptions.newConsumption",
                isFlatRated: "$consumptions.isFlatRated",
               }//project
       },
       {$sort:{address:1,no:1}}
   ]);    console.log('[*] {printList}.')
    pdf.printListInPDF(list, global.context,res);
}
