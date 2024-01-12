
const Consumer = require('../model/consumer')
const User = require('../model/user')
const bcrypt = require('bcrypt');
exports.mockData = (index) => {
    return {
        no: String(index).padStart(5, '0'),
        name: '-------',
        address: '++++++',
        watermeterId: String(rand1000()) + String(rand1000()),
        consumptions: [{
            periode: '2022', newConsumption: 0.1 * rand1000() + 20, oldCunsumption: 0, payed: 1000,
            canceledBy: '-',
        },],
        redactions: [{ user: 'بلقاسم', time: Date.now() }, { user: 'mourad', time: Date.now() }],
    }
}

exports.insertMockDataConsumer = async (length) => {
    try {
        for (let index = 0; index < length; index++) {
            const x = await Consumer.create(mockData(index));
        }
    } catch (e) {
        console.log(e)
    }
}

function rand1000() {
    let x = Math.random() * 100;
    return Math.floor(x);
}
exports.createUser = async (username, password) => {
    try {

        password = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password });

    } catch (e) {
        console.log(e)
    }
}


exports.insertDatas = async (db) => {
    try {
        //console.log('======db=',db);
        for(let index=0; index<db.length;index++) {
            let item=db[index];
            const _isFound =await  Consumer.find({ no: item.no });
            if (_isFound.length === 0) {
                const _old=Number(item.newConsumption??=0);
                const _new=Number(item.newConsumption??=0)+rand1000();
                const element= {
                    no: item.no,
                    name: item.nom,
                    address: "تكوت",
                    watermeterId: item.watermeter,
                    consumptions: [{
                        periode: '2022',
                        oldConsumption:_old,
                        newConsumption:_new,
                        payed: 0,
                        canceledBy: '-',
                    },],
                    redactions: [{ user: 'بلقاسم', time: Date.now() },],
                };
                const _x =await  Consumer.insertMany(element);
            }

        }
        
    } catch (error) {
        console.log(error)
    }
}
/*
exports.updateAll=async()=>{
    const consumer=await Consumer.update({},{consumptions[0].saved:true},{multi:true})
}
*/




