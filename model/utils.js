const mongoose = require('mongoose');

async function getNextSequenceValue(sequenceName){
    var db = mongoose.connection.collection("counters");
    const filter = { _id: sequenceName }
    const update = { $inc: { sequence_value: 1 } };
    var doc = await db.findOneAndUpdate(filter, update, { new: true }).then((value) => {
        return value.value.sequence_value;
    });
    return doc;
}

module.exports = { getNextSequenceValue };