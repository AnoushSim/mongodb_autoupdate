const mongoose = require('mongoose');
const request = require('request');

require('./models/BTC_model');
require('./models/BCH_model');

const CryptocurrencyDB = mongoose.createConnection('mongodb://localhost:27017/cryptocurrency', { useNewUrlParser: true });
let db = {
    BTC: CryptocurrencyDB.model('BTC'),
    BCH: CryptocurrencyDB.model('BCH')
}

//for writing BTC currencies to BTC collection
request('https://api.coinbase.com/v2/exchange-rates?currency=BTC' , (err, response, body) => {

    try {
        obj = JSON.parse(body)
    } catch (e) {
        /*request('https://api.coinbase.com/v2/exchange-rates?currency=BTC' , (err, response, body) => {
            obj = JSON.parse(body)
        })*/
        console.log('failed to parse object');
    }

    let rates = obj && obj.data ? obj.data.rates || {} : {};

    let all_currency_objects = Object.keys(rates).map(key => {
        return {
            currency: key,
            value: rates[key]
        }

    });


// inserts all objects to BTC collection
    db.BTC.insertMany(all_currency_objects, (err, docs) => {
      if(err) {
          console.log("Error! ", err)
      }
    });

});

//for writing BCH currencies to BCH collection
 request('https://api.coinbase.com/v2/exchange-rates?currency=BCH' , (err, response, body) => {

    try {
        obj = JSON.parse(body)
    } catch (e) {
        /*request('https://api.coinbase.com/v2/exchange-rates?currency=BTC' , (err, response, body) => {
            obj = JSON.parse(body)
        })*/
        console.log('failed to parse object');
    }

    let rates = obj && obj.data ? obj.data.rates || {} : {};

    let all_currency_objects = Object.keys(rates).map(key => {
        return {
            currency: key,
            value: rates[key]
        }

    });


// inserts all objects to BCH collection
    db.BCH.insertMany(all_currency_objects, (err, docs) => {
        if(err) {
            console.log("Error! ", err)
        }
    });

});


let update_btc = () => request('https://api.coinbase.com/v2/exchange-rates?currency=BTC' , (err, response, body) => {

    try {
        obj = JSON.parse(body)
    } catch (e) {
        /*request('https://api.coinbase.com/v2/exchange-rates?currency=BTC' , (err, response, body) => {
            obj = JSON.parse(body)
        })*/
        console.log('failed to parse object');
    }

    let rates = obj && obj.data ? obj.data.rates || {} : {};

    let all_currency_objects = Object.keys(rates).map(key => {
        return {
            currency: key,
            value: rates[key]
        }

    });


// inserts all objects to BTC collection

    for(let ix = 0; ix < all_currency_objects.length; ++ix) {
        db.BTC.updateOne({'currency': all_currency_objects[ix].currency }, {$set: { 'value': all_currency_objects[ix].value}}, (err,doc) => {
            if(err)
                console.log(err);
        });

    }
});



let update_bch = () => request('https://api.coinbase.com/v2/exchange-rates?currency=BCH' , (err, response, body) => {

    //db.BCH.remove({});
    try {
        obj = JSON.parse(body)
    } catch (e) {
        /*request('https://api.coinbase.com/v2/exchange-rates?currency=BTC' , (err, response, body) => {
            obj = JSON.parse(body)
        })*/
        console.log('failed to parse object');
    }

    let rates = obj && obj.data ? obj.data.rates || {} : {};

    let all_currency_objects = Object.keys(rates).map(key => {
        return {
            currency: key,
            value: rates[key]
        }

    });


// inserts all objects to BTC collection

    for(let ix = 0; ix < all_currency_objects.length; ++ix) {
        db.BCH.updateOne({'currency': all_currency_objects[ix].currency }, {$set: { 'value': all_currency_objects[ix].value}}, (err,doc) => {
            if(err)
                console.log(err);
        });

    }
})
//updating all datas in every 10 minutes
setInterval(update_btc, 1500000);
setInterval(update_bch, 1500000);


