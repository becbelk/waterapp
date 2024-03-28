const op = require('./rows_operations');
const stringOp = require('../../../../misc/string_op');
const calculator = require('../../../../misc/calculator');
const global = require('../../../../misc/global');
//const rop = require('./rows_operations')
/*
const _dx0 = 50;
const _dx1 = 30;
const _dx2 = 15;
const _dx3 = 10;
const _dy0 = 20;
const _dy1 = 15;
const _dy2 = 10;
const _dy3 = 5;
*/
//            0   1    2   3    4    5    6   7    8    9    10    11   12  13   14    15   16   17                   //todo error here
const lastColumn=19;

const _x = [ 20, 100, 150, 200, 250, 300, 380, 450, 530, 600, 650, 680, 730,,760, 800 ,850,  1000, 1090, 1150, 1185,1185, 1185, 1185,1185]
const _x2 =                       [  300, 380, 450, 530, 600,]
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
//                0      1         2                3         4          5        6       7     8     9      10      11     12    13         14          15        16       17    
const header4 = ['رقم', 'العداد', 'اللقب و الاسم', 'العدد'  , 'العدد' , 'الفرق',   'ق',   'ق',   'ق',   'ق', 'م', 'م', 'م', 'م', 'المبلغ', 'المجموع',  'رسم '  , 'الاشتراك', 'المبلغ ',].reverse();
const header5 = [''   , ''      , ''            , 'القديم' , 'الجديد', ''     ,  '1' , '2'  , '3'  , '4'  , 'ر', 'ر', 'ر', 'ر', 'الجزافي',  ''     , 'التطهير', ''       , 'اﻹجمالي'].reverse();
const header4_5 = [''   , ''      , ''            , '    ' , '    ', ''     ,  '' , ''  , ''  , ''  , '1', '2', '3', '4', '',  ''     , '', ''       , ''].reverse();
exports.buildPDFReport = (doc, list, context) => {
    buildPageHeader(doc, context);
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
    printTextAra(doc, 16, global.context.labelPeriodeL1, _x[0], 200, _y[3], 25);
    printTextAra(doc, 16, global.context.labelPeriodeL2, _x[0], 200, _y[4], 25);
    context.topPage = 90//
}


const buildPageHeader = (doc, context) => {
    top = context.topPage;
    let margin = doc.options.margin;
    doc.save()  //horizontal line above
        .moveTo(_x[0], 21 + context.topPage)
        .lineTo(_x[lastColumn], 21 + context.topPage)
        .lineWidth(.5)
        .stroke()
// visited suturday
    header4.map((item, i) => printTextAra(doc, 12, item, _x[i], _x[i + 1] - _x[i] - 5, top + _y[1], 21));
    header5.map((item, i) => printTextAra(doc, 12, item, _x[i], _x[i + 1] - _x[i] - 5, top + _y[2], 21));
    header4_5.map((item, i) => printTextAra(doc, 12, item, _x[i], _x[i + 1] - _x[i]+5, top + (_y[1]+_y[2])/2, 21));
    context.topPage += _y[2]
    doc.save()  //horizontal line below
        .moveTo(_x[0], 21 + context.topPage)
        .lineTo(_x[lastColumn], 21 + context.topPage)
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
    currentRow.firstLine.map((item, i) => {
        printTextAra(doc, 10, item, _x[i], _x[i + 1] - _x[i], context.topPage, 21)
    });
    currentRow.secondLine.map((item, i) => {
        printTextAra(doc, 10, item, _x2[i], _x2[i +1] - _x2[i], context.topPage+8, 21)
    });
    doc.save() //drow last column
        .moveTo(_x[lastColumn], context.topPage)
        .lineTo(_x[lastColumn], context.topPage + _height)
        .lineWidth(.5)
        .stroke();
    //drow the horizontal line 

    doc.save()  //horizontal
        .moveTo(_x[0], 21 + context.topPage)
        .lineTo(_x[lastColumn], 21 + context.topPage)
        .lineWidth(.5)
        .stroke()

}



const mapDataToList = (currentData, context) => {
    let invoice = calculator.calculateDetailedInvoice(currentData, context);
    _listTop = [
    (Number(invoice.totalToPay ??= 0).toFixed(2)),
    (Number(invoice.inscriptionTax ??= 0).toFixed(2)),
    (Number(invoice.totalTaxes ??= 0).toFixed(2)),

    (Number(invoice.totalAmounts ??= 0).toFixed(2)),//
    (Number(invoice.flatRateAmount ??= 0).toFixed(2)),//forfait
    (Number(invoice.amounts[3] ??= 0).toFixed(2)),
    (Number(invoice.amounts[2] ??= 0).toFixed(2)),
    (Number(invoice.amounts[1] ??= 0).toFixed(2)),
    (Number(invoice.amounts[0] ??= 0).toFixed(2)),
    (Number(invoice.edges[3] ??= 0).toFixed(0)),
    (Number(invoice.edges[2] ??= 0).toFixed(0)),
    (Number(invoice.edges[1] ??= 0).toFixed(0)),
    (Number(invoice.edges[0] ??= 0).toFixed(0)),
    (Number(invoice.diff ??= 0).toFixed(0)),
    (Number(invoice.newC ??= 0).toFixed(0)),
    (Number(invoice.oldC ??= 0).toFixed(0)),
    (currentData.name),
    (currentData.watermeterId),
    (currentData.no),
]
    _listButtom=[
  (Number(invoice.taxes[3] ??= 0).toFixed(2)),
    (Number(invoice.taxes[2] ??= 0).toFixed(2)),
  (Number(invoice.taxes[1] ??= 0).toFixed(2)),
 (Number(invoice.taxes[0] ??= 0).toFixed(2)),]
    calulateSum(invoice, context,)
    return {firstLine:_listTop,secondLine:_listButtom};
}


const calulateSum = (invoice, context) => {
    console.log('context',context)
    context.sum[0] += Number(invoice.totalToPay ??= 0);
    context.sum[1] += Number(invoice.inscriptionTax ??= 0);
    context.sum[2] += Number(invoice.totalTaxes ??= 0);



 
    context.sum[3] += Number(invoice.amounts[3] ??= 0)+Number(invoice.taxes[3] ??= 0);
    context.sum[4] += Number(invoice.amounts[2] ??= 0)+Number(invoice.taxes[2] ??= 0);
    context.sum[5] += Number(invoice.amounts[1] ??= 0)+Number(invoice.taxes[1] ??= 0);
    context.sum[6] += Number(invoice.amounts[0] ??= 0)+ Number(invoice.taxes[0] ??= 0);

   context.sum[7] += Number(invoice.totalAmounts ??= 0);
    context.sum[8] += Number(invoice.flatRateAmount ??= 0);

    context.sum[9] += Number(invoice.edges[3] ??= 0);
    context.sum[10] += Number(invoice.edges[2] ??= 0);
    context.sum[11] += Number(invoice.edges[1] ??= 0);
    context.sum[12] += Number(invoice.edges[0] ??= 0);
}


const printSum = (doc, context) => {
    // this is the initial value
    if (context.isNotFirstPage == 1) { //is not the first page
        context.topPage += 20;
        context.sum.map((item, i) => {//todo secondSum
            //      console.log('item=', item, '_x[', i, '],=', _x[i], 'context.isNotFirstPage=', context.isNotFirstPage)
            printTextAra(doc, 10, Number(item).toFixed(2), _x[i], _x[i + 1] - _x[i], context.topPage, 21)
        }
        );

    }
    else {  //is  the first page
        console.log(' etat initial')
        context.isNotFirstPage = 1;
        context.isTop = 0;
    }
}
const printLabel = (doc, context) => {
    context.isTop = context.isTop % 2
    let lastLabelIndex = context.isLastPage ? 2 : 0;
    index = context.isNotFirstPage + (context.indexSwitch % 2) + lastLabelIndex;
    console.log('index=', index, ';   lastLabel=', lastLabelIndex, ';   context.isNotFirstPage=', context.isNotFirstPage)
    label = context.sumLabel[index]
    printTextAra(doc, 10, label, _x[17], 100, context.topPage, 21);
    context.indexSwitch++;
    context.isTop++
    // console.log('context.indexSwitch=', context.indexSwitch, 'index=', index, 'label=', label)
    //console.log('context.isLastPage=', context.isLastPage, 'index=', index, 'label=',)
}