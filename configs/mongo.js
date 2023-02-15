'use strict'

const mongose = require('mongoose');



exports.connect = async () => {
    try {
        const uriMongo = `${process.env.URI_MONGO}`;
        mongose.set('strictQuery', false);
        await mongose.connect(uriMongo);
        console.log('Connected to DB');
    } catch (err) {
        console.error(err);        
    }
}