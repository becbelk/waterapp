exports.context = {
    periode: "2022",
    labelPeriodeL1: "الفترة الممتدة من 01 جانفي 2023",
    labelPeriodeL2: "إلى غاية 31 ديسمبر 2023",
    PAPC: 'عبد الحفيظ سلطاني',
    organization: 'بلدية تكوت',
    titleOfInvoice: ' كشف عداد المياه للاستعمال المنزلي والصناعي ',
    note: 'عدم تسديد الفاتورة في أجل 30 يوم ابتداء من تاريخ صدورها تطبق عليه غرامة التأخير',
    datelabel: 'تكوت في : _________',
    username: 'user1',//
    topPage: 0,
    sum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],      //17 sums
    isNotFirstPage: 0,//true==>etat initial: is the first page
    isLastPage:0, //false
    headButtomSwitch: ['inHeader','inButtom'],
    indexSwitch:1,
    sumLabel: ['',  'المجموع للترحيل','المجموع المرحل','المجموع الكلي'],
    endOfDocument: false,
}
exports. levelAmountTable = [
    { edge: 100, price: 6.3, tax: 2.35, difference: 100, index: 1 },
    { edge: 220, price: 20.48, tax: 7.64, difference: 120, index: 2 },
    { edge: 328, price: 34.65, tax: 12.93, difference: 108, index: 3 },
    { edge: 100000000, price: 40.95, tax: 15.28, difference: 0, index: 4 }
]

//exports. maxLevel = 4;

exports. inscriptionTax = 200;
exports. flatRateAmount = 5000;


