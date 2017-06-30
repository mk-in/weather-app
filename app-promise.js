const yargs = require('yargs');
const axios = require('axios');

// Get location address 
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            description: 'location address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}`;

// first get lat,long for given address
// prepare the URL and pass to forecast.io
axios.get(geocodeURL)
    .then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('No data found for this address');
        };

        console.log(response.data.results[0].formatted_address);

        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        const weatherURL =
            `https://api.darksky.net/forecast/d3afe95e057fc27471a2bc07369215d0/${lat},${lng}?units=si `;

// now that we got geocode, get the weather
// we are nesting promise to form a promise chain
        return axios.get(weatherURL);

    })
    .then((weatherResponse) => {
        const temperature = weatherResponse.data.currently.temperature;
        const apparentTemperature = weatherResponse.data.currently.apparentTemperature;

        console.log(`Today's temperature is ${temperature}. Feels like  ${apparentTemperature} `);
    })
    .catch((e) => {
// takes care of all kind of errors        
        if (e.code === 'ENOTFOUND') {
            console.log('Cannot reach API server');
        } else {
            console.log(e.message);
        }
    })