const Consumer = require('../model/consumer.js');
const ctx = require('../router/context.js');


//في هذه الدالة يقوم بالبحث عن المستهلكين
//ويرجع كقيم
//10 مستهلكين وفق الترتيب التسلسلي
//

exports.find = async (searchTerm, page, saveCriteria,sort) => {
    let sorts={
        'no+1':{$sort:{no:1}},
        'no-1':{$sort:{no:-1}},
        'time':{$sort:{editAt:-1}}
    }
    console.log('sorts[sort]=',sorts[sort])
    //request which is search term should be filtered and without error
    const perPage = 10;
    let query = (searchTerm) ?
        {
            saved: saveCriteria,
            $text: { $search: searchTerm }
        }//todo : to be canceled or updated many pbms
        : { saved: saveCriteria }
    console.log('query=', query);
    const count = await Consumer.countDocuments({ saved: saveCriteria });
    console.log('count=', count)





    let consumers = await Consumer.aggregate([
        { $unwind: "$consumptions" },
        { $unwind: "$redactions" },
        { $match: { saved: saveCriteria, "consumptions.periode": ctx.context.periode } },
        {
            $project: {
               // _id:"$_id",
                no: 1,
                name: 1,
                address: 1,
                watermeterId: 1,
                oldConsumption: "$consumptions.oldConsumption",
                newConsumption: "$consumptions.newConsumption",
                isFlatRated: "$consumptions.isFlatRated",
                editedAt: "$redactions.time"//******** 
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id", no: "$no", name: "$name",
                    address: "$address", watermeterId: "$watermeterId",
                    oldConsumption: "$oldConsumption", newConsumption: "$newConsumption",
                    isFlatRated: "$isFlatRated"
                },
                editedAt: { "$max": "$editedAt" }
            }
        },
        {
            $project: {  
                _id:"$_id._id",
                no: "$_id.no",
                name: "$_id.name",
                address:"$_id.address",
                watermeterId: "$_id.watermeterId",
                oldConsumption: "$_id.oldConsumption",
                newConsumption: "$_id.newConsumption",
                isFlatRated: "$_id.isFlatRated",
                editedAt: "$_id.editedAt"//******** 

            }
        },

       sorts[sort],
        { $skip: page * perPage - perPage },//todo negative number
        { $limit: perPage },

    ]);
    //console.log('consumer=', consumers)
    // let consumers = await Consumer.find(query)
    //     .sort({ no: 1 })
    //     .skip(page * perPage - perPage)
    //     .limit(perPage)
    //     .exec();
    let pages = Math.ceil(count / perPage);
    const nextPage = parseInt(page) + 1;
    const previousPage = parseInt(page) - 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const hasPreviousPage = previousPage >= 1;

   // let hasNext= await consumers.hasNext();
    console.log('type=', JSON.stringify(consumers))
    return { consumers, count, pages, hasNextPage, nextPage, hasPreviousPage, previousPage }

}

const _agg=async ()=>{
    return Consumer.aggregate([
        { $unwind: "$consumptions" },
        { $unwind: "$redactions" },
        { $match: { saved: saveCriteria, "consumptions.periode": ctx.context.periode } },
        {
            $project: {
               // _id:"$_id",
                no: 1,
                name: 1,
                address: 1,
                watermeterId: 1,
                oldConsumption: "$consumptions.oldConsumption",
                newConsumption: "$consumptions.newConsumption",
                isFlatRated: "$consumptions.isFlatRated",
                editedAt: "$redactions.time"//******** 
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id", no: "$no", name: "$name",
                    address: "$address", watermeterId: "$watermeterId",
                    oldConsumption: "$oldConsumption", newConsumption: "$newConsumption",
                    isFlatRated: "$isFlatRated"
                },
                editedAt: { "$max": "$editedAt" }
            }
        },
        {
            $project: {  
                _id:"$_id._id",
                no: "$_id.no",
                name: "$_id.name",
                address:"$_id.address",
                watermeterId: "$_id.watermeterId",
                oldConsumption: "$_id.oldConsumption",
                newConsumption: "$_id.newConsumption",
                isFlatRated: "$_id.isFlatRated",
                editedAt: "$_id.editedAt"//******** 

            }
        },

       sorts[sort],
        { $skip: page * perPage - perPage },//todo negative number
        { $limit: perPage },

    ]);
}

exports.findOne = async (id) => {
    let consumer = await Consumer.findById(id);
    return consumer
}






exports.findSingleNo = async (no, saveCriteria) => {
    console.log('findSingleNo searching in interval', no)

    const count = await Consumer.countDocuments({ no: no, saved: saveCriteria })
    let consumers = await Consumer.find({ no: no, saved: saveCriteria });

    console.log('consumer=', consumers)
    return { consumers, count, pages: 1, hasNextPage: false, nextPage: null, hasPreviousPage: false, previousPage: null };
}






exports.findBetweenNo = async (interval, page, saveCriteria) => {
    const perPage = 10;
    //ordering no1,2
    min = interval[0] <= interval[1] ? interval[0] : interval[1];
    max = interval[0] <= interval[1] ? interval[1] : interval[0];
    console.log(' findBetweenNo searching in interval ', interval, 'min=', min, 'max=', max)
    let query = {
        saved: saveCriteria,
        no: {
            $gte: min,
            $lte: max
        }
    };
    const count = await Consumer.countDocuments(query)
    let pages = Math.ceil(count / perPage);
    const nextPage = parseInt(page) + 1;
    const previousPage = parseInt(page) - 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const hasPreviousPage = previousPage >= 1;
    let consumers = await Consumer.aggregate([
        { $unwind: "$consumptions" },
        { $match: { saved: saveCriteria, "consumptions.periode": ctx.context.periode ,
         no: { $gte: min,$lte: max }} },
        {
            $project: {
               // _id:"$_id",
                no: 1,
                name: 1,
                address: 1,
                watermeterId: 1,
                oldConsumption: "$consumptions.oldConsumption",
                newConsumption: "$consumptions.newConsumption",
                isFlatRated: "$consumptions.isFlatRated",
                editedAt: "$redactions.time"//******** 
            }
        },
       {$sort:{no:1},},
        { $skip: page * perPage - perPage },//todo negative number
        { $limit: perPage },

    ]);
    return { consumers, count, pages, hasNextPage, nextPage, hasPreviousPage, previousPage }
}




/*
exports.text=async(searchTerm,page)=>{
    const q1 = { $text: { $search: searchTerm }, };

    const _projection = { no: 1, name: 1, address: 1, }

    const consumers = await Consumer.aggregate(q1, _projection);
    const count = consumers.length;
    const nextPage = parseInt(page) + 1;
    const previousPage = parseInt(page) - 1;
    const hasNextPage = nextPage < Math.ceil(count / perPage);
    const hasPreviousPage = previousPage > 0;
    let pages= Math.ceil(count / perPage)
    console.log('[#] {Search} for request: [', searchTerm, '], found[', consumers.length, '] consumer(s)');
    let consumer=consumers.slice((page-1) * perPage ,page*perPage);
return 
{consumer,count,pages,hasNextPage,nextPage,hasPreviousPage,previousPage}
}*/