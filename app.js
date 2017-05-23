
const yargs = require('yargs');

const geocodeLib = require('./lib/geocode');
const weatherLib = require('./lib/weather');


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

geocodeLib.getGeocode(argv.address, (geocodeErrorMessage, results) => {
// first get lat,long for given address
// prepare the URL and pass to forecast.io
    if (geocodeErrorMessage) {
        console.log(geocodeErrorMessage);
    } else {
        // console.log(JSON.stringify(results, undefined, 2));
        
// now that we got geocode, get the weather
        weatherLib.getWeather(results.longitude, results.latitude, (forecastErrorMessage, weatherResults) => {
            if (forecastErrorMessage) {
                console.log(forecastErrorMessage);
            } else {
                // console.log(JSON.stringify(forecastResults, undefined, 2));
                console.log(`Today's temperature is ${weatherResults.temperature}. in ${results.formatted_address}`);
                console.log(`Feels like ${weatherResults.apparentTemperature}`);
            }
        });
    }
});

