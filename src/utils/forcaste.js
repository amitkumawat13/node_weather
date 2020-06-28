const request = require("postman-request");
const say = console.log;

const forcast = (cords , callback) => {
    const url = `http://api.weatherstack.com/current?access_key=341e46364ae9a41422d064d6e255320a&query=${cords}&units=m`;

    request({ url,json : true},(err,{body}) =>{
        if(err) {
            callback('unable to connect', undefined)
        } else if( body.success === false ) {
            callback('invalid location',undefined);
        } else {
            callback(undefined,body.current)
            // say(`${res.body.current.weather_descriptions[0]}. Its currently ${res.body.current.temperature} degrees out and its feels like ${res.body.current.feelslike} report from ${cords.placeName}`);
        }
    })
}
module.exports = forcast;