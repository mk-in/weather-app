const request = require('request');

const getWeather = (lng, lat, callback) => {
    request({
        url: `https://api.darksky.net/forecast/d3afe95e057fc27471a2bc07369215d0/${lng},${lat}?units=si `,
        json: true,
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to get weather from  forecast.io');
        }
    });
};


module.exports = {
    getWeather
};