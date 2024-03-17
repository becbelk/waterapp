const Consumer = require('../../model/consumer');
const global = require('../../misc/global');
const { formatNo } = require('../../misc/string_op');

MAX = "1000000000";
const sorts = {
    'no+1': { $sort: { address: 1, no: 1 } },
    'no-1': { $sort: { address: 1, no: -1 } },
    'time': { $sort: { editAt: -1 } }
}

const linkToDisplay = {
    'read': 'consumer/read/table',
    'update': 'consumer/update/edit_list'
}


const perPage = 10;

/*
في هذه الدالة يقوم بالبحث عن المستهلكين
ويرجع كقيم
10 مستهلكين وفق الترتيب التسلسلي

*/

exports.allSites = async () => {
    let sites = await Consumer.aggregate([{
        $group: {
            _id: {
                address: "$address",
            }
        }},]);
        console.log('sites:',sites)
    return sites;
}

exports.find = async ({ searchTerm, page, isSaved, sort }) => {

    let stages = {};
    let initialStages = toStages(searchTerm)
    updatedStages = ("$match" in initialStages) ?
        { ...initialStages, $match: { ...initialStages["$match"], saved: isSaved, deleted: false, "consumptions.periode": global.context.periode } }
        : { ...initialStages, $match: { saved: isSaved, deleted: false, "consumptions.periode": global.context.periode } }
    console.log('initialStages updated =', updatedStages);
    stages = buildStages({ query: updatedStages, sortingWith: sort, paginationTo: page })

    let countQuery = buildCountQuery(initialStages, isSaved);
    console.log('forCountQuery=', countQuery);
    let count = await Consumer.countDocuments(countQuery);

    let consumers = await Consumer.aggregate(stages);
    console.log(consumers);
    let pages = Math.ceil(count / perPage);
    const nextPage = parseInt(page) + 1;
    const previousPage = parseInt(page) - 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const hasPreviousPage = previousPage >= 1;
    return {
        consumers, count, pages, hasNextPage, currentPage: page,
        nextPage, hasPreviousPage, previousPage, areSaved: isSaved
    }

}


const buildStages = ({ query, sortingWith, paginationTo }) => {
    let matchStage = { $match: query["$match"], };

    let page = paginationTo;
    let sort = sortingWith;
    let textStage = ('$text' in query && query["$text"]["$search"]) ?
        [{ $match: { $text: query["$text"] }, }]
        : [];

    let unwindStages = [
        { $unwind: "$consumptions" },
        { $unwind: "$redactions" },
    ];
    //garbedge
    const lastStages = [{
        $project: {
            no: 1,
            name: 1,
            address: 1,
            watermeterId: 1,
            oldConsumption: "$consumptions.oldConsumption",
            newConsumption: "$consumptions.newConsumption",
            isFlatRated: "$consumptions.isFlatRated",
            isTaxed: "$consumptions.isTaxed",
            editedAt: "$redactions.time",//******** 
            saved: 1
        }
    },
    {
        $group: {
            _id: {
                _id: "$_id",
                no: "$no",
                name: "$name",
                address: "$address",
                saved: "$saved",
                watermeterId: "$watermeterId",
                oldConsumption: "$oldConsumption",
                newConsumption: "$newConsumption",
                isFlatRated: "$isFlatRated",
                isTaxed: "$isTaxed",
            },
            editedAt: { $max: "$editedAt" }
        }
    },
    {
        $project: {
            _id: "$_id._id",
            no: "$_id.no",
            name: "$_id.name",
            address: "$_id.address",
            watermeterId: "$_id.watermeterId",
            oldConsumption: "$_id.oldConsumption",
            newConsumption: "$_id.newConsumption",
            isFlatRated: "$_id.isFlatRated",
            isTaxed: "$_id.isTaxed",
            editedAt: "$editedAt",
            saved: "_id.saved",
        }
    },

    sorts[sort],
    { $skip: (page - 1 > 0) ? (page - 1) * perPage : 0 },
    { $limit: perPage }];
    let globalStages = [...textStage, ...unwindStages, matchStage, ...lastStages]
    //console.log('globalStages =>', globalStages)

    return globalStages;
}


const cancelStages = () => {


    let unwindStages = [
        { $unwind: "$consumptions" },
        { $unwind: "$redactions" },
    ];
    //garbedge
    const lastStages = [{
        $project: {
            no: 1,
            name: 1,
            address: 1,
            watermeterId: 1,
            oldConsumption: "$consumptions.oldConsumption",
            newConsumption: "$consumptions.newConsumption",
            isFlatRated: "$consumptions.isFlatRated",
            isTaxed: "$consumptions.isTaxed",
            editedAt: "$redactions.time"//******** 
        }
    },
    {
        $group: {
            _id: {
                _id: "$_id",
                no: "$no",
                name: "$name",
                address: "$address",
                watermeterId: "$watermeterId",
                oldConsumption: "$oldConsumption",
                newConsumption: "$newConsumption",
                isFlatRated: "$isFlatRated",
                isTaxed: "$isTaxed"
            },
            editedAt: { $max: "$editedAt" }
        }
    },
    {
        $project: {
            _id: "$_id._id",
            no: "$_id.no",
            name: "$_id.name",
            address: "$_id.address",
            watermeterId: "$_id.watermeterId",
            oldConsumption: "$_id.oldConsumption",
            newConsumption: "$_id.newConsumption",
            isFlatRated: "$_id.isFlatRated",
            isTaxed: "$_id.isTaxed",
            editedAt: "$editedAt"//******** 

        }
    },

    sorts[sort],
    { $skip: (page - 1 > 0) ? (page - 1) * perPage : 0 },
    { $limit: perPage }];
    let globalStages = [...textStage, ...unwindStages, { "consumptions.periode": global.context.periode }
        , ...lastStages]
    //console.log('globalStages =>', globalStages)

    return globalStages;
}


const toStages = (maybeStr) => {
    if (/^[\d]+$/.test(maybeStr)) {
        return { $match: { no: formatNo(maybeStr), } };
    }
    else {
        return queryBetweenTwoNumbers(maybeStr)
    }
}


const queryBetweenTwoNumbers = (maybeStr) => {


    if (/^[\d]+[\s]*(-)[\s]*[\d]+$/.test(maybeStr)) {
        let interval = maybeStr.split('-');
        return { $match: { no: inBetween({ interval: interval }), } };
    } else {
        return queryText(maybeStr);
    }
}

const queryText = (maybeStr) => {

    if (/^[\u0621-\u064A\/]+$/.test(maybeStr)) {
        return { $text: { $search: maybeStr }, }//todo
    }
    else {
        console.log('not text or empty');
        return {};
    }
}


const inBetween = ({ interval }) => {
    min = interval[0] <= interval[1] ? interval[0] : interval[1];
    max = interval[0] <= interval[1] ? interval[1] : interval[0];
    return {
        $gte: formatNo(min),
        $lte: formatNo(max)
    }

}
const buildCountQuery = (stages, isSaved) => {
    console.log("stages=", stages)
    if ("$text" in stages) {
        console.log('text exist')//todo:empty text
        return {
            $text: stages["$text"], saved: isSaved,
        }
    } else {
        console.log('match exist')
        if ("$match" in stages)
            return { ...stages["$match"], saved: isSaved, }
        else return { saved: isSaved, }
    }
}