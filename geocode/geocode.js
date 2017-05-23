const request = require('request');

const geocodeAddress = (address, callback) => {
    // build URL

    const serviceURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`;
    const forecastHost = 'https://api.darksky.net/forecast/d3afe95e057fc27471a2bc07369215d0/';


    // send request
    request({
        url: serviceURL,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to google servers');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find the address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                longitude: body.results[0].geometry.location.lat,
                latitude: body.results[0].geometry.location.lng,
                formatted_address: body.results[0].formatted_address,
                forecastURL: `${forecastHost + body.results[0].geometry.location.lng},${body.results[0].geometry.location.lat}`
            });
        }
    });
};

const forecastAddress = (forecastURL, callback) => {
    request({
        url: forecastURL,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, body);
        } else {
            callback('Unable to get weather from  forecast.io');
        }
    });
};


module.exports = {
    geocodeAddress,
    forecastAddress
};