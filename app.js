
const yargs = require('yargs');

const geocodeLib = require('./geocode/geocode');

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

geocodeLib.geocodeAddress(argv.address, (geocodeErrorMessage, results) => {
// first get lat,long for given address
// prepare the URL and pass to forecast.io
    if (geocodeErrorMessage) {
        console.log(geocodeErrorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
        
// now that we got geocode, get the weather
        geocodeLib.forecastAddress(results.forecastURL, (forecastErrorMessage, forecastResults) => {
            if (forecastErrorMessage) {
                console.log(forecastErrorMessage);
            } else {
                console.log(JSON.stringify(forecastResults, undefined, 2));
            }
        });
    }
});

