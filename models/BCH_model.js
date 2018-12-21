const mongoose = require('mongoose');

const BCHSchema = new mongoose.Schema({

    currency: String,
    value: Number
});

mongoose.model('BCH', BCHSchema);

