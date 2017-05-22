const request = require('request');

const geocodeAddress = (address, callback) => {
    // build URL
    const host = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    const param = encodeURIComponent(address);
    const serviceURL = host + param;


    // send request
    request({
        url: serviceURL,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to google servers');
        } else if(body.status === 'ZERO_RESULTS') {
            callback('Unable to find the address.');
        } else if(body.status === 'OK') {
            callback(undefined, {
                longitude: body.results[0].geometry.location.lat,
                latitude: body.results[0].geometry.location.lng,
                formatted_address: body.results[0].formatted_address
            });
        };
    });
};
module.exports = {
    geocodeAddress
};