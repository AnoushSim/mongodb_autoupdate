const mongoose = require('mongoose');

const BTCSchema = new mongoose.Schema({

    currency: String,
    value: Number

});

mongoose.model('BTC', BTCSchema);