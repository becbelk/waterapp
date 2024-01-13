const op = require('./rows_operations');
const stringOp = require('../../../misc/string_op');
const calculator = require('../../../misc/calculator');



const _x=[
    0,  25,  50,  75, 100, 125, 150, 175, 200, 225,
 250, 275, 300, 325, 350, 375,400, 425, 450, 475,
  500, 525, 550, 575,  600, 625, 650, 675, 700, 725,
   750, 775,  800, 825, 850, 875, 900, 925, 950, 975
]
const _y=[  
      0,  20,  40,  60,  80, 100, 120, 140, 160, 180,
       200, 220,  240, 260, 280, 300, 320, 340, 360, 380
  ]



/**طباعة الفواتير للمستهلكين */



exports.buildInvoices = (doc, currentData, row, rowInPage, context) => {
    let m = doc.options.margin;
    let lineWidth = .5;
    let y = row * doc.page.height / rowInPage + m;
    let xmin = m;
    let xmax = doc.page.width - m;

    let invoiceWidth = 20;
    drawTableOfInvoce(doc, invoiceWidth, xmin, xmax, y);
    putDataInInvoice(currentData, doc, invoiceWidth, xmin, xmax, y, context)

    doc.save()
        .moveTo(xmin, y +m+ doc.page.width / rowInPage)
        .lineTo(xmax, y +m+ doc.page.width / rowInPage)
        .lineWidth(lineWidth)
        .stroke();

}







const drawTableOfInvoce = (doc, invoiceWidth, xmin, xmax, y,) => {
    let lineWidth = .5
    doc
        .save()
        .moveTo(xmin, y - 7)
        .lineTo(xmax, y - 7)
        .lineTo(xmax, y + invoiceWidth)
        .lineTo(xmin, y + invoiceWidth)
        .lineTo(xmin, y)
        .fill('#CFCFCF');
    doc.save()
        .moveTo(xmin, y + invoiceWidth)
        .lineTo(xmax, y + invoiceWidth)
        .lineWidth(lineWidth).stroke()
        .moveTo(xmin, y + 2 * invoiceWidth)
        .lineTo(xmax, y + 2 * invoiceWidth)
        .lineWidth(lineWidth).stroke()
        .moveTo(xmin, y +3.3 * invoiceWidth)
        .lineTo(xmax, y + 3.3* invoiceWidth)
        .lineWidth(lineWidth).stroke()
        .fill('#000000');



}

const print = (doc, size, str, x, y) => {
    doc.save()
        .fontSize(size)
        .text(stringOp.ara(str), x, y);

}
const putDataInInvoice = (currentData, doc, invoiceWidth, xmin, xmax, y, context) => {
    let m = doc.options.margin;
    let invoice = calculator.calculateDetailedInvoice(currentData);//!error here
    console.log('currentData=',currentData)
    console.log('invoice=',invoice)
    doc.save()
        .font('Amiri',);
    print(doc, 12, context.organization, _x[21], y-_y[1]/2);
    print(doc, 18, context.titleOfInvoice, _x[7], y-_y[1]/2);
    print(doc, 10, 'للفترة', _x[5], y-_y[1]/2);
    print(doc, 10, context.periode, _x[1], y-_y[1]/2);
    
    print(doc, 10, 'رقم : ', _x[22], y+_y[1]);
    print(doc, 10, currentData.no, _x[20], y+_y[1]);
    print(doc, 10, 'اللقب والاسم:', _x[17], y+_y[1]);
    print(doc, 10,currentData.name , _x[14], y+_y[1]);
    print(doc, 10,'العداد: ' , _x[12], y+_y[1]);
    print(doc, 10,currentData.watermeterId , _x[11], y+_y[1]);
    print(doc, 10,'القديم:',_x[10], y+_y[1]);
    print(doc, 10,Number(invoice.oldC).toFixed(0) , _x[9], y+_y[1]);//todo: error
    print(doc, 10,'الجديد:' , _x[8], y+_y[1]);
    print(doc, 10,Number(invoice.newC).toFixed(0) , _x[7], y+_y[1]);
    print(doc, 10,'الفرق:' , _x[6], y+_y[1]);
    print(doc, 10,Number(invoice.diff).toFixed(0) , _x[5], y+_y[1]);
    
    

    print(doc, 10,'1 : 25 م ', _x[20], y+_y[2]);
    print(doc, 10,Number(invoice.edges[0]??='0').toFixed(2), _x[19], y+_y[2]);
    print(doc, 10,Number(invoice.amounts[0]??='0').toFixed(2), _x[19], y+_y[3]-7);
    
    print(doc, 10,'2 : 55 م ', _x[17], y+_y[2]);
    print(doc, 10,Number(invoice.edges[1]??='0').toFixed(2), _x[16], y+_y[2]);
    print(doc, 10,Number(invoice.amounts[1]??='0').toFixed(2), _x[16], y+_y[3]-7);
    
  
    print(doc, 10,'3 : 82 م ', _x[14], y+_y[2]);
    print(doc, 10,Number(invoice.edges[2]??='0').toFixed(2), _x[13], y+_y[2]);
    print(doc, 10,Number(invoice.amounts[2]??='0').toFixed(2), _x[13], y+_y[3]-7);
       
    print(doc, 10,'4 : -- م ', _x[11], y+_y[2]);
    print(doc, 10,Number(invoice.edges[3]??='0').toFixed(2), _x[10], y+_y[2]);
    print(doc, 10,Number(invoice.amounts[3]??='0').toFixed(2), _x[10], y+_y[3]-7);

    print(doc, 10,'المجموع', _x[9], y+_y[2]);
    print(doc, 10, Number(invoice.totalAmounts??='0').toFixed(2), _x[8], y+_y[3]-7);
   
    print(doc, 10,'رسم التطهير', _x[6], y+_y[2]);
    print(doc, 10, Number(invoice.totalTaxes??='0').toFixed(2), _x[5]+7,y+_y[3]-7);
    
    print(doc, 10,'المبلغ اﻹجمالي' , _x[2], y+_y[2]);
    print(doc, 10,Number(invoice.totalToPay).toFixed(2), _x[1],y+_y[3]-7);
    
    print(doc, 12,context.datelabel , _x[18], y+_y[3]+m/2);
    print(doc, 8,context.note, _x[1], y+_y[5]+5);
    
    print(doc, 10,'رئيس المجلس الشعبي البلدي : ', _x[18], y+_y[4]+m/4);
    print(doc, 12,context.PAPC, _x[14], y+_y[4]+m/2);

}



