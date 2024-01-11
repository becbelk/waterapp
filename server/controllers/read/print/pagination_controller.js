const a3 = require('./a3_page_builder.js');
//const a3 = require('./a3_report_builder.js');
const invoiceBuilder = require('./a4_invoice_builder.js');
const headerBuilder = require('./headless_settings.js');
const options = require('./waterapp_table_options.js');
const op = require('./rows_operations.js')
const stringOp = require('../../../misc/string_op.js');
const init= require('./header_footer_initializer.js')
const fontName = 'Amiri';

const footerSum = init.zeroRow;
const headerSum = init.zeroRow

exports.a3Report = (doc, datas, context) => {
    console.log('->[*] {paginateReport} ');
    const {rowsInPage,rowsInFirstPage}=a3Configuration(doc)
 
    const pagesCount =1+ Math.ceil((datas.length - rowsInFirstPage) / rowsInPage); 


    let lastIndexInPreviousPage = 0;
    let lastIndexInCurrentPage = rowsInFirstPage - 1;
    let SinglePageList = (rowsInFirstPage <= datas.length) ?
        datas.slice(0, rowsInFirstPage)
        : datas;

    let _isLastPage = lastIndexInPreviousPage + rowsInPage > datas.length;
    for (let i = 0; !_isLastPage; i++) {
       context.isLastPage= _isLastPage = lastIndexInPreviousPage + rowsInPage > datas.length;
        if (i > 0) {
            context.topPage = 0;//todo toppage
            doc.addPage();

        } else {
            a3.buildReportHeader(doc, context)
        }
        a3.buildPDFReport(doc, SinglePageList, context);

        lastIndexInPreviousPage = lastIndexInCurrentPage;
        lastIndexInCurrentPage = (datas.length > rowsInPage + lastIndexInPreviousPage) ?
            rowsInPage + lastIndexInPreviousPage
            : datas.length - 1;
        SinglePageList = datas.slice(lastIndexInPreviousPage, lastIndexInCurrentPage);       
    }
}


/**   page building invoices
 * 
 */

exports.a4Invoices = async (doc, datas, context) => {
    const pageHeight = doc.page.height
    const rowHeight = 165;
    const rowsInPage = Math.floor(pageHeight / rowHeight);//- 7;//28
    console.log('pageHeight=', pageHeight, 'rowsInPage=', rowsInPage,)
    const pagesCount = Math.ceil(datas.length / rowsInPage);
    for (let i = 0; i < pagesCount; i++) {//todo dont forget pagecount
        if (i > 0) {
            doc.addPage();
        }
        for (let j = 0; j < rowsInPage; j++) {
            i
            let currentInvoice = i * rowsInPage + j;
            if (currentInvoice < datas.length) {
                invoiceBuilder.buildInvoices(doc, datas[currentInvoice], j, rowsInPage, context); //todo 2023
            } else break;
        }
    }
}
 const a3Configuration=(doc)=>{
    let h=doc.page.height;
    let      rowHeight=22;
    return{ 
        rowsInPage:Math.floor(h / rowHeight) - 4,//28,
        rowsInFirstPage:Math.floor(h / rowHeight) -8,
    }
 }

const firstPageettings=()=>{

}







































// exports.paginateReport = (tablepdf, datas, context) => {
//     console.log('->[*] {paginateReport} ')
//     console.log('table length=', datas.length)
//     const pageHeight = tablepdf.page.height;
//     const rowHeight = 20;

//     const rowsInPage = Math.floor(pageHeight / rowHeight) - 7;//28
//     let rowsInFirstPage = rowsInPage - 4;
//     const pagesCount = 1 + Math.ceil((datas.length - rowsInFirstPage) / rowsInPage);

//     console.log('rowsInPage=', rowsInPage)
//     console.log('pagesCount=', pagesCount)

//     let rowsInCurrentPage = rowsInFirstPage;//24

//     let lastRowInPreviousPage = 0;
//     //pagination 
//     let isLastPage = false;
//     for (let i = 0; i < pagesCount; i++) {
//         isLastPage = rowsInFirstPage + i * rowsInPage >= datas.length;
//         console.log('i=', i, 'isLastPage=', isLastPage, 'rowsInFirstPage +i*rowsInPage=', rowsInFirstPage + i * rowsInPage, '>=datas.length=', datas.length);
//         op.rowAssignement(headerSum, footerSum);

//         if (i > 0) {
//             tablepdf.addPage();

//             lastRowInPreviousPage = rowsInFirstPage + (i - 1) * rowsInPage;
//             rowsInCurrentPage = Math.min(datas.length - lastRowInPreviousPage, rowsInPage);
//         } else {
//             tablepdf.table(a3.buildReportHeader(), headerBuilder.heaadlessOptions(tablepdf));
//         }

//         let currentPage = [];

//         for (let j = 0; j < rowsInCurrentPage; j++) {
//             previous = (i === 0) ? 0 : rowsInFirstPage + (i - 1) * rowsInPage;
//             currentPage.push(datas[previous + j]);
//         }

//         let index = i;
//         const contentOfPage = a3.buildReportPage(currentPage, index, headerSum, footerSum, isLastPage, context);

//         tablepdf.table(a3.getHeaderContent(), options.getHeaderOptions(tablepdf, fontName));
//         tablepdf.table(contentOfPage, options.getTableOptions(tablepdf, fontName));
//     }
// }
