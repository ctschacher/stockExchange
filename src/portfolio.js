// this one is built on the discovery that you can retrieve many different shares at once (currently value only): no need to connect seperately for each share
const   unirest = require("unirest"),
        fs = require('fs'),
        path = require('path');

const getQuotes = function(stockSymbolArray) {
    return new Promise((resolve, reject) => {
        let symbolsString = '';
        stockSymbolArray.forEach(element => {
            symbolsString += `${element}%2C`;
        });
        symbolsString = symbolsString.slice(0, -3);
    
        unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes")
        .query({
            "region": "FR",
            "lang": "en",
            "symbols": symbolsString
        })
        .headers({
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": getApiKey().apiKey,
            "useQueryString": true
        })
        .end(function (res) {
            if (res.error) reject(res.error);
            else resolve(res.body.quoteResponse.result);
            // return res.body.quoteResponse.result; // console.log(`${res.body.quoteResponse.result[0].shortName}: ${res.body.quoteResponse.result[0].regularMarketPrice}`);  
        });
    })
};

function getApiKey() {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname,'../resources/apiKey.json'), 'utf-8'));
    } catch (error) {
        throw new Error(`Couldn't read file: ${error.message}`);
    }
};

function loadPortfolio() {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname,'../resources/shares.json'), 'utf-8'));
    } catch (error) {
        throw new Error(`Couldn't read file: ${error.message}`);
    }
};

async function getPortfolioUpdate() {
    let portfolio = loadPortfolio();
    let quotes = {};
    try {
        quotes = await getQuotes(Object.keys(portfolio));  // retrieves latest quotes (of all shares of portfolio) from rapidApi (Yahoo Finance)
    } catch (error) {
        throw new Error(error);
    };

    quotes.forEach(share => {                   
        Object.assign(portfolio[share.symbol], share);      // adds latest quotes infos to portfolio object
    });

    return portfolio;
};

exports.getPortfolioUpdate = getPortfolioUpdate;



