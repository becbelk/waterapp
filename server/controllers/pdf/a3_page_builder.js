const op = require('./rows_operations.js');
const stringOp = require('../../misc/string_op.js');
const calculator = require('../../misc/calculator.js');
const rop = require('./rows_operations.js')

const _dx0 = 50;
const _dx1 = 30;
const _dx2 = 15;
const _dx3 = 10;
const _dy0 = 20;
const _dy1 = 15;
const _dy2 = 10;
const _dy3 = 5;

const _x = [20, 80, 120, 170, 220, 250,
    300, 350, 400, 450, 500,
    550, 600, 650, 700, 750,
    800, 850, 890, 930,
    970, 1090, 1150, 1185]

const _height = 20
const _y = [
    0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200,
    220, 240, 260, 280, 300, 320, 340, 360, 380, 400,
    420, 440, 460, 480, 500, 520, 540, 560, 580, 600,
    620, 640, 660, 680, 700, 720, 740, 760, 780, 800,
    //820, 840, 860, 880, 900, 920, 940, 960, 980, 1000
]

const header0 = 'الجمهورية الجزائرية الديمقراطية الشعبية';
const header1 = 'ولاية باتنة'
const header2 = ['دائرة تكوت', '', '', '', '', 'قائمة  المستهلكين للمياه الخاصة للاستهلاك المنزلي والصناعي']
const header3 = ['بلدية تكوت']
const header4 = ['رقم', 'العداد', 'اللقب و الاسم', 'العدد', 'العدد', 'الفرق', 'ق_1', 'ق_2', 'ق_3', 'ق_4', 'م_1', 'م_2', 'م_3', 'م_4', 'المبلغ', 'المجموع', 'رـ1', 'رـ2', 'رـ3', 'رـ4', 'رسم ', 'الاشتراك', 'المبلغ ',].reverse();
const header5 = ['', '', '', 'القديم', 'الجديد', '', '', '', '', '', '', '', '', '', 'الجزافي', '', '', '', '', '', 'التطهير', '', 'اﻹجمالي'].reverse();
exports.buildPDFReport = (doc, list, context) => {
    buildPageHeader(doc, context);
    //console.log('================================================================');
    printSum(doc, context);
    list.map((consumer, i) => putDataInLineA3(doc, consumer, i, context));
    context.isFirstPage = false;
    printSum(doc, context);

}

exports.buildReportHeader = (doc, context) => {
    printTextAra(doc, 16, header0, _x[5], 500, _y[1], 25);
    printTextAra(doc, 16, header1, _x[12], 500, _y[2], 25);
    printTextAra(doc, 16, header2[0], _x[12], 500, _y[3], 25);
    printTextAra(doc, 16, header2[5], _x[6], 500, _y[3], 25);
    printTextAra(doc, 16, header3[0], _x[12], 500, _y[4], 25);
    context.topPage = 90//
}


const buildPageHeader = (doc, context) => {
    top = context.topPage;
    let margin = doc.options.margin;
    doc.save()  //horizontal line above
        .moveTo(_x[0], 21 + context.topPage)
        .lineTo(_x[23], 21 + context.topPage)
        .lineWidth(.5)
        .stroke()

    header4.map((item, i) => printTextAra(doc, 12, item, _x[i], _x[i + 1] - _x[i] - 5, top + _y[1], 21));
    header5.map((item, i) => printTextAra(doc, 12, item, _x[i], _x[i + 1] - _x[i] - 5, top + _y[2], 21));
    context.topPage += _y[2]
    doc.save()  //horizontal line below
        .moveTo(_x[0], 21 + context.topPage)
        .lineTo(_x[23], 21 + context.topPage)
        .lineWidth(.5)
        .stroke()

}


exports.printPageHeader = (doc, index) => {
    if (index > 0) doc.addPage()

}
const printTextAra = (doc, size, str, x, w, y, h) => {
    doc.save()
        .fontSize(size)
        .text(' ' + stringOp.ara(str), x, y, { width: w, align: 'right' });

}

const putDataInLineA3 = (doc, currentData, order, context) => {
    context.topPage += _height;// the order in the list of db

    let currentRow = mapDataToList(currentData, context);
    currentRow.map((item, i) => {
        printTextAra(doc, 10, item, _x[i], _x[i + 1] - _x[i], context.topPage, 21)
    });
    doc.save() //drow last column
        .moveTo(_x[23], context.topPage)
        .lineTo(_x[23], context.topPage + _height)
        .lineWidth(.5)
        .stroke();
    //drow the horizontal line 

    doc.save()  //horizontal
        .moveTo(_x[0], 21 + context.topPage)
        .lineTo(_x[23], 21 + context.topPage)
        .lineWidth(.5)
        .stroke()

}



const mapDataToList = (currentData, context) => {
    let invoice = calculator.calculateDetailedInvoice(currentData, context);
    _resultList = [];
    _resultList.push(Number(invoice.totalToPay ??= 0).toFixed(2));
    _resultList.push(Number(invoice.inscriptionTax ??= 0).toFixed(2));
    _resultList.push(Number(invoice.totalTaxes ??= 0).toFixed(2))
    _resultList.push(Number(invoice.taxes[3] ??= 0).toFixed(2))
    _resultList.push(Number(invoice.taxes[2] ??= 0).toFixed(2))
    _resultList.push(Number(invoice.taxes[1] ??= 0).toFixed(2))
    _resultList.push(Number(invoice.taxes[0] ??= 0).toFixed(2))
    _resultList.push(Number(invoice.totalAmounts ??= 0).toFixed(2))//
    _resultList.push(Number(invoice.flatRateAmount ??= 0).toFixed(2))//forfait
    _resultList.push(Number(invoice.amounts[3] ??= 0).toFixed(2))
    _resultList.push(Number(invoice.amounts[2] ??= 0).toFixed(2))
    _resultList.push(Number(invoice.amounts[1] ??= 0).toFixed(2))
    _resultList.push(Number(invoice.amounts[0] ??= 0).toFixed(2))
    _resultList.push(Number(invoice.edges[3] ??= 0).toFixed(2))
    _resultList.push(Number(invoice.edges[2] ??= 0).toFixed(2))
    _resultList.push(Number(invoice.edges[1] ??= 0).toFixed(2))
    _resultList.push(Number(invoice.edges[0] ??= 0).toFixed(2))
    _resultList.push(Number(invoice.diff ??= 0).toFixed(2))
    _resultList.push(Number(invoice.oldC ??= 0).toFixed(2))
    _resultList.push(Number(invoice.newC ??= 0).toFixed(2))
    _resultList.push(currentData.name)
    _resultList.push(currentData.watermeterId)
    _resultList.push(currentData.no)

    calulateSum(invoice, context,)
    return _resultList;
}


const calulateSum = (invoice, context,) => {
    context.sum[0] += Number(invoice.totalToPay ??= 0);
    context.sum[1] += Number(invoice.inscriptionTax ??= 0);
    context.sum[2] += Number(invoice.totalTaxes ??= 0);

    context.sum[3] += Number(invoice.taxes[3] ??= 0);
    context.sum[4] += Number(invoice.taxes[2] ??= 0);
    context.sum[5] += Number(invoice.taxes[1] ??= 0);
    context.sum[6] += Number(invoice.taxes[0] ??= 0);

    context.sum[7] += Number(invoice.totalAmounts ??= 0);
    context.sum[8] += Number(invoice.flatRateAmount ??= 0);

    context.sum[9] += Number(invoice.amounts[3] ??= 0);
    context.sum[10] += Number(invoice.amounts[2] ??= 0);
    context.sum[11] += Number(invoice.amounts[1] ??= 0);
    context.sum[12] += Number(invoice.amounts[0] ??= 0);

    context.sum[13] += Number(invoice.edges[3] ??= 0);
    context.sum[14] += Number(invoice.edges[2] ??= 0);
    context.sum[15] += Number(invoice.edges[1] ??= 0);
    context.sum[16] += Number(invoice.edges[0] ??= 0);


}


const printSum = (doc, context) => {
    // this is the initial value
    if (context.isNotFirstPage == 1) { //is not the first page
        context.topPage += 20;
        context.sum.map((item, i) => {
            //console.log('item=',item,'_x[',i,'],=',_x[i],'context.isNotFirstPage=',context.isFNotirstPage)
            printTextAra(doc, 10, Number(item).toFixed(2), _x[i], _x[i + 1] - _x[i], context.topPage, 21)
        }
        );
        printLabel(doc, context);

    }
    else {//is  the first page
        console.log(' etat initial')
    }
}
const printLabel = (doc, context) => {
 //   context.indexSwitch = (context.indexSwitch + 1) % 2;
    index = context.isNotFirstPage + (context.indexSwitch++ %2) + context.isLastPage;
    label = context.sumLabel[index]
    printTextAra(doc, 10, label, _x[17], 100, context.topPage, 21);
    context.isNotFirstPage = 1;
    console.log('context.indexSwitch=', context.indexSwitch, 'index=', index, 'label=',label)
    console.log('context.isLastPage=', context.isLastPage, 'index=', index, 'label=',)
}