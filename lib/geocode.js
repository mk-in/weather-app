const request = require('request');

const getGeocode = (address, callback) => {
    // send request
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
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
                // forecastURL: `${forecastHost + body.results[0].geometry.location.lng},${body.results[0].geometry.location.lat}`
            });
        }
    });
};

module.exports = {
    getGeocode
};
