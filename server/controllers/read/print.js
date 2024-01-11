const Consumer = require('../../model/consumer.js');
const pdf = require('./print/pdf_controller.js');
const fs = require('fs')
const path = require('path')
const context = require('../../router/context.js')



exports.printePage = async (req, res) => {
    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';
    //todo: add query
    res.render('read/print/main');
}


exports.printInvoices = async (req, res) => {
    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';

    const list = await Consumer.find({saved:true});//todo: sorting with "address"
    console.log('[*] call {printInvoices}   [list.count] = [', list.length, ']')
    pdf.printInvoicesInPDF(list, context.context,res)
}

exports.printList = async (req, res) => {
    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';

    const list = await Consumer.find({saved:true});//todo: sorting with "address"
    console.log('[*] {printList}.')
    pdf.printListInPDF(list, context.context,res);
}
