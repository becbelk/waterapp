const calculator = require('../../../misc/calculator');
const headerBuilder = require('./headless_settings');
const op = require('./rows_operations');
const stringOp = require('../../../misc/string_op');

const _x=[
    0,  25,  50,  75, 100, 125, 150, 175, 200, 225,
  250, 275, 300, 325, 350, 375, 400, 425, 450, 475,
  500, 525, 550, 575, 600, 625, 650, 675, 700, 725,
  750, 775, 800, 825, 850, 875, 900, 925, 950, 975
]
const _y=[  
      0,  20,  40,  60,  80, 100, 120, 140, 160, 180,
       200, 220,  240, 260, 280, 300, 320, 340, 360, 380
  ]

exports.buildReportPage = (list, index, headerSum, footerSum, isLastPage, context) => {
    footerSum.watermeterId = isLastPage ? stringOp.ara('المجموع الكلي:') : stringOp.ara('المجموع للترحيل');
    headerSum.watermeterId = stringOp.ara('المجموع المرحل');


    const listConsumer = (index === 0) ?
        [] :
        [op.rowFormatted(headerSum, headerSum.watermeterId)];
    for (let j = 0; j < list.length; j++) {
        listConsumer.push(op.elementOf(list, j, context));
        footerSum = op.add(footerSum, listConsumer[j]);
    }//end of LOOP

    let _ftrsm = op.rowFormatted(footerSum);
    listConsumer.push(_ftrsm);


    return {
        headers: headerBuilder.waterAppTableHeader(),
        datas: listConsumer,
    }
}














exports.getHeaderContent = () => {
    const _struct = {
        headers: headerBuilder.waterAppTableHeader(),
        datas: headerBuilder.waterAppTableHeaderLabels(),
    };
    return _struct;
}

exports.buildReportHeader = () => {
    const _struct = {
        headers: headerBuilder.rupublicHeaderSettings(),
        datas: headerBuilder.rupublicHeaderContent(),
    };
    return _struct;
}

exports.buildReportHeader = () => {
    const _struct = {
        headers: headerBuilder.rupublicHeaderSettings(),
        datas: headerBuilder.rupublicHeaderContent(),
    };
    return _struct;
}
