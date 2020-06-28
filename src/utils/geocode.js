const request = require('postman-request');

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      location
    )}.json?access_token=pk.eyJ1IjoiYW1pdGt0IiwiYSI6ImNrYTQ3ODN3cjAwb2MzcGx3YjB5bWU4NnkifQ.2ORUPMpldLema4tLFfrXGA&limit=1`;
  
    request({ url, json: true }, (err, { body }) => {
      if (err) {
        callback("unable to connect to mapbox api", undefined);
      } else if (body.features.length === 0) {
        callback("unable to find the location", undefined);
      } else {
        const latitude = body.features[0].center[1];
        const longitude = body.features[0].center[0];
        const placeName = body.features[0].place_name;
        const mapcord = latitude + "," + longitude;
        callback(undefined,{mapcord,placeName});
      }
    });
  };

module.exports = geocode;