
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

geocodeLib.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
    }
});