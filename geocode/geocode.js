const request = require('request');

const geocodeAddress = (address, callback) => {
    // build URL
    const host = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    const param = encodeURIComponent(address);
    const serviceURL = host + param;

    let errorMessage;
    let results = {
        longitude: '',
        latitude: '',
        formatted_address: ''
    };


    // send request
    request({
        url: serviceURL,
        json: true
    }, (error, response, body) => {
        if(error) {
            errorMessage = 'Unable to connect to google servers';
        } else if(body.status === 'ZERO_RESULTS') {
            errorMessage = 'Unable to find the address.';
        } else if(body.status === 'OK') {
            results = {
                longitude: body.results[0].geometry.location.lat,
                latitude: body.results[0].geometry.location.lng,
                formatted_address: body.results[0].formatted_address
            }
            // console.log(`Inside1 ${JSON.stringify(results, undefined,2)}`);
        };
    });
// This is a bad way to doing, We have to set this timeout because we wanted to set the variables inside response
// and then make a single callback
//
// Because NODE has non-blocking IO, therefore below callback was executed before response
// Hence a delay is added to ensure callback is received.
// However this is a wrong way of doing. 
// Instead we should execute callback in respective IF blocks in request statement

    setTimeout(() => {
        callback(errorMessage, results);
    }, 3000);

};
module.exports = {
    geocodeAddress
};