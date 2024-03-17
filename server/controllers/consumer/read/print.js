const Consumer = require('../../../model/consumer');
const pdf = require('./print/pdf_controller');
const global = require('../../../misc/global');
const  search = require('../search');



exports.main = async (req, res) => {
    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';
   let sites=await  search.allSites();
    res.render('consumer/read/print/main', { pages: -1 ,sites});
}


exports.printInvoices = async (req, res) => {

    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';
    reinitializeContext()//todo not necessaary
    const list = await Consumer.aggregate([// todo : repeated
        { $unwind: "$consumptions" },
        { $match: { saved: true, "consumptions.periode": global.context.periode } },
        {
            $project: {
                no: 1,
                name: 1,
                address: 1,
                watermeterId: 1,
                oldConsumption: "$consumptions.oldConsumption",
                newConsumption: "$consumptions.newConsumption",
                isFlatRated: "$consumptions.isFlatRated",
                isTaxed:"$consumptions.isTaxed",
            }//project
        },
        { $sort: { address: 1, no: 1 } }
    ]);
    console.log('[*] call {printInvoices}   [list.count] = [', list.length, ']')
    pdf.printInvoicesInPDF(list, global.context, res)
}

exports.printList = async (req, res) => {
    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';
    reinitializeContext();
    const list = await Consumer.aggregate([
        { $unwind: "$consumptions" },// todo : repeated
        { $match: { saved: true, deleted: false, "consumptions.periode": global.context.periode } },
        {
            $project: {
                no: 1,
                name: 1,
                address: 1,
                watermeterId: 1,
                oldConsumption: "$consumptions.oldConsumption",
                newConsumption: "$consumptions.newConsumption",
                isFlatRated: "$consumptions.isFlatRated",
                isTaxed:"$consumptions.isTaxed",
            }//project
        },
        { $sort: { address: 1, no: 1 } }
    ]);
    console.log('[printList] :')
    pdf.printListInPDF(list, global.context, res);
}
exports.printCollect= async(req,res)=>{
    let site=req.params.collect;
    reinitializeContext();
    console.log('site=',site)
   let list = await Consumer.aggregate([
        { $unwind: "$consumptions" },// todo : repeated
        { $match: { saved: true, deleted: false, "consumptions.periode": global.context.periode ,address:site} },
        {
            $project: {
                no: 1,
                name: 1,
                address: 1,
                watermeterId: 1,
                oldConsumption: "$consumptions.oldConsumption",
                newConsumption: "$consumptions.newConsumption",
                isFlatRated: "$consumptions.isFlatRated",
                isTaxed:"$consumptions.isTaxed",
            }//project
        },
        { $sort: { address: 1, no: 1 } }
    ]);
    console.log('[printList] :',list);
    pdf.printListInPDF(list, global.context, res);
}
const reinitializeContext=()=>{
    global.context.sum=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
    global.context.isNotFirstPage= 0;
    global.context.isLastPage=0;
    global.context.isTop=1;
    global.context.topPage=0;
    global.context.endOfDocument=false; //
    indexSwitch=2;
}