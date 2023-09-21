const mongoose = require('mongoose');
const {mongo} = require('../configs/vars')

exports.connect = async () => {
    try {
        await mongoose.connect(mongo);
        console.log(`mongodb connection success ${mongo}`)

    } catch (error) {
        console.error(`connection fail`, error);
    }
};

