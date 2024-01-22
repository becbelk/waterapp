const Consumer = require('../model/consumer');
const global = require('../misc/global');
const mongoose = require('mongoose');
const { formatNo } = require('../misc/string_op');

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



exports.find = async ({ searchTerm, page, isSaved, sort }) => {
    let count = 0;
    let stages = {};
    isSaved=(isSaved=='on')
    let initialStages = toStages(searchTerm)
    // console.log('initialStages  =', initialStages);
    updatedStages = ("$match" in initialStages) ?
        { ...initialStages, $match: { ...initialStages["$match"], saved: isSaved, "consumptions.periode": global.context.periode } }
        : { ...initialStages, $match: { saved: isSaved, "consumptions.periode": global.context.periode } }
    console.log('initialStages updated =', updatedStages);
    stages = buildStages({ query: updatedStages, sortingWith: sort, paginationTo: page })
    // console.log('final stage updated =', finalStages);

    let countQuery = buildCountQuery(initialStages, isSaved);
    console.log('forCountQuery=', countQuery);
    count = await Consumer.countDocuments(countQuery);
    console.log('count=', count)

    let consumers = await Consumer.aggregate(stages);
    let pages = Math.ceil(count / perPage);
    const nextPage = parseInt(page) + 1;
    const previousPage = parseInt(page) - 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const hasPreviousPage = previousPage >= 1;

    // console.log('type=', JSON.stringify(consumers))
    return { consumers, count, pages, hasNextPage,
         nextPage, hasPreviousPage, previousPage, areSaved:isSaved }

}


const buildStages = ({ query, sortingWith, paginationTo }) => {
    let matchStage = { $match: query["$match"] };
    //    console.log('matchStage  =========', matchStage)

    let page = paginationTo;
    let sort = sortingWith;
    let textStage = ('$text' in query && query["$text"]["$search"]) ?
        [{ $match: { $text: query["$text"] } }]
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
                isFlatRated: "$isFlatRated"
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
            editedAt: "$editedAt"//******** 

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
                isFlatRated: "$isFlatRated"
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
        return { $match: { no: formatNo(maybeStr) } };
    }
    else {
        return queryBetweenTwoNumbers(maybeStr)
    }
}


const queryBetweenTwoNumbers = (maybeStr) => {


    if (/^[\d]+[\s]*(-)[\s]*[\d]+$/.test(maybeStr)) {
        let interval = maybeStr.split('-');
        return { $match: { no: inBetween({ interval: interval }) } };
    } else {
        return queryText(maybeStr);
    }
}

const queryText = (maybeStr) => {

    if (/^[\u0621-\u064A\/]+$/.test(maybeStr)) {
        return { $text: { $search: maybeStr } }
    }
    else {
        console.log('not text or empty');
        return {/* $text: { $search: "" } */ };
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
            $text: stages["$text"], saved: isSaved
        }
    } else {
        console.log('match exist')
        if ("$match" in stages)
            return { ...stages["$match"], saved: isSaved }
        else return {}
    }
}