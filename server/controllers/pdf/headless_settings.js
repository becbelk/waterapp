const calculator = require('../../misc/calculator.js');

const b = `
`;
const fontName = 'Amiri';
const reportHeader = `الجمهورية الجزائرية الديمقراطية الشعبية   
 قائمة  المستهلكين للمياه الخاصة للاستهلاك المنزلي والصناعي`;

const wilaya = "ولاية باتنة";
const daira = "دائرة تكوت";
const commune = "بلدية تكوت";
const pageAr = "الجمهورية الجزائرية الديمقراطية الشعبية";



exports.custum795X994headersBuilder = () => {
  return [
    {
      "property": "no", "width": 50, 
      "align": "right", "features": ['rtla'],
    },

    {

      "property": "name", "width": 115, "height": 100,
      "align": "center", "features": ['rtla'],
    },

    {
      "width": 50, 
      "align": "right", "features": ['rtla'],
    },


    {
      "property": "new", "width": 52, 
      "align": "right", "features": ['rtla'],
    },

    {
      "property": "cons_level_0", "width": 52, 
      "align": "right", "features": ['rtla'],
    },

    {
      "property": "cons_level_1", "width": 52, 
      "align": "right", "features": ['rtla'],
    },
    {
      "property": "cons_level_2", "width": 52, 
      "align": "right", "features": ['rtla'],
    },

    {
      "property": "cons_level_3", "width": 52, 
      "align": "right", "features": ['rtla'],
    },

    {

      "property": "amount_0", "width": 52, 
      "align": "right", "features": ['rtla'],
    },

    {
      "property": "amount_1", "width": 52, 
      "align": "right", "features": ['rtla'],
    },

    {
      "property": "amount_2", "width": 52, 
      "align": "right", "features": ['rtla'],
    },

    {
      "property": "amount_3", "width": 52, 
      "align": "right", "features": ['rtla'],
    },

    {
      "property": "tax_0", "width": 52, 
      "align": "right", "features": ['rtla'],
    },

    {
      "property": "tax_1", "width": 52, 
      "align": "right", "features": ['rtla'],
    },

    {
      "property": "tax_2", "width": 52, 
      "align": "right", "features": ['rtla'],
    },

    {
      "property": "tax_3", "width": 52, 
      "align": "right", "features": ['rtla'],
    },



    {
      "property": "totalAmounts", "width": 60, 
      "align": "right", "features": ['rtla'],
    },
    {
      "property": "totalTaxes", "width": 60, 
      "align": "right", "features": ['rtla'],
    },

    {
      "property": "inscriptionTax", "width": 52, 
      "align": "right", "features": ['rtla'],
    },


    {
      "property": "totalToPay", "width": 60, 
      "align": "right", "features": ['rtla'],
    },

  ].reverse();
  ;
}



exports.waterAppTableHeader = () => {
  return [
    {
      "property": "no", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "watermeterId", "width": 62, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "name", "width": 85, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "old", "width": 50, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "new", "width": 50, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "cons_level_0", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "cons_level_1", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "cons_level_2", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "cons_level_3", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "amount_0", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "amount_1", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "amount_2", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "amount_3", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "tax_0", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "tax_1", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "tax_2", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "tax_3", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "totalAmounts", "width": 60, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "totalTaxes", "width": 60, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "inscriptionTax", "width": 52, 
      "align": "center", "features": ['rtla'],
    },
    {
      "property": "totalToPay", "width": 60, 
      "align": "center", "features": ['rtla'],
    },
  ].reverse();
}

function ara(string) {
  return string.split(" ").reverse().join(" ");
}




exports.waterAppTableHeaderLabels =()=>{
  const labels=[
    {
  no: "رقم",    watermeterId: "العداد",   name: "اللقب و الاسم",  old: "العدد",  new: "العدد", 
  cons_level_0: "ق_1",   cons_level_1: "ق_2",   cons_level_2: "ق_3",  cons_level_3: "ق_4",
  amount_0: "م_1",  amount_1: "م_2",   amount_2: "م_3",   amount_3: "م_4",
  tax_0: "رـ1",  tax_1: "رـ2",  tax_2: "رـ3",  tax_3: "رـ4",  totalAmounts: "المجموع",
    totalTaxes: "رسم ",  totalToPay: "المبلغ ",},
{

                                                               old: "القديم",  new: "الجديد",
  cons_level_0: calculator.levelAmountTable[0].edge,
  cons_level_1: calculator.levelAmountTable[1].edge,
  cons_level_2: calculator.levelAmountTable[2].edge,
  cons_level_3: '//',

  amount_0: calculator.levelAmountTable[0].price,
  amount_1: calculator.levelAmountTable[1].price,
  amount_2: calculator.levelAmountTable[2].price,
  amount_3: calculator.levelAmountTable[3].price,

  tax_0: calculator.levelAmountTable[0].tax,
  tax_1: calculator.levelAmountTable[1].tax,
  tax_2: calculator.levelAmountTable[2].tax,
  tax_3: calculator.levelAmountTable[3].tax,

  totalTaxes: " التطهير",
  inscriptionTax: "الاشتراك",
  totalToPay: " الاجمالي",
}  ,{

  cons_level_0: "م³",
  cons_level_1: "م³",
  cons_level_2: "م³",
  cons_level_3: "م³",
  amount_0: "دج",
  amount_1: "دج",
  amount_2: "دج",
  amount_3: "دج",

  tax_0: "دج",
  tax_1: "دج",
  tax_2: "دج",
  tax_3: "دج",

}
];
  return labels;
  
}

exports.rupublicHeaderContent=()=>{
  const _struct= [{
    right: ara('ولاية باتنة'),
    middle: ara( 'الجمهورية الجزائرية الديمقراطية الشعبية'),
  
}, {
    right: ara( 'دائرة تكوت'),
    middle:  ara('قائمة المستهلكين للمياه الخاصة للاستهلاك المنزلي والصناعي'),
    left: 'قطاع'
}, {
    right:  ara('بلدية تكوت'),
    middle:  ara('للفترة من '),
    
},
];
return _struct;
}


exports.heaadlessOptions=(table)=>{
const _struct=  {

    hideHeader: true,
    divider:{

      horizontal: { disabled: true},
    },
    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) =>
        table.font(fontName)
            .fontSize(14)
};
return _struct;
}


exports.rupublicHeaderSettings= ()=>{

    const _list=
  [
    {
    "property": "right", "width": 100, 
    "align": "right", "features": ['rtla'],
  },
  
  {
    "property": "middle", "width": 900, 
    "align": "center", "features": ['rtla'],
  },
  {
    "property": "left", "width": 100, 
    "align": "center", "features": ['rtla'],
  },
  ].reverse();
  return _list
  }