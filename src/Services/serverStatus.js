'use strict'

exports.customStatus = (res, httpStatus, message) => {
    let msgReturn = res.status(httpStatus).send({message: message});
};

exports.internal200 = (res, message) => {
    let msgReturn = res.status(200).send({message:`Server 200: OK. ${message}`});
    return msgReturn;
};

exports.internal201 = (res, message) => {
    let msgReturn = res.status(201).send({message:`Server 201: CREATED. ${message}`});
    return msgReturn;
};

exports.internal500 = (res, message, err) => {
    let msgReturn = res.status(500).send({message:`Server 500: Internal Server Error. ${message}`, error: err.message});
    return msgReturn;
};

exports.internal400 = (res, message) => {
    let msgReturn = res.status(400).send({message:`Server 400: Bad Request. ${message}`});
    return msgReturn;
};

exports.internal404 = (res, message) => {
    let msgReturn = res.status(404).send({message:`Server 404:  Not Found. ${message}`});
    return msgReturn;
};

exports.internal403 = (res, message, err) => {
    let msgReturn = res.status(404).send({message:`Server 403:  Forbidden. ${message}`, error: err});
    return msgReturn;
};

