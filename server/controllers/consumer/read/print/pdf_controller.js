const pdfkitTable = require('pdfkit-table');
const pdfkit = require('pdfkit');
const fs = require('fs');
const taf = require('tafgeetjs');
const paginate = require('./pagination_controller');

exports.printListInPDF = async (list, context, res) => {
  const globalReport = new pdfkitTable({
    size: 'A3',
    margin: 15,
    bufferPages: true,
    layout: 'landscape',
    rtl: true
  });
  globalReport.registerFont('Amiri', './public/fonts/Amiri-Bold.ttf');

  globalReport.font('Amiri',);
  console.log('->[*] {printListInPDF} ');
  await  paginate.a3Report(globalReport, list, context);
  globalReport.pipe(res)
  globalReport.end();
}
exports.printInvoicesInPDF = async (list, context, res) => {
  const invoices = new pdfkit({
    size: 'A4',//
    margin: 20,
    bufferPages: true,
    rtl: true
  });
  invoices.registerFont('Amiri', './public/fonts/Amiri-Bold.ttf');

  console.log('|-> {printInvoicesInPDF} ');
  await paginate.a4Invoices(invoices, list, context)
  invoices.pipe(res);
  invoices.end();
}