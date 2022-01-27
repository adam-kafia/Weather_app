const request = require("postman-request");
const geoCode = (place, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(place) +
        ".json?access_token=pk.eyJ1IjoiZGVtaWlpOTgiLCJhIjoiY2t5cmVqdDkxMHN5MTJvbzdsMWQ1azhmZCJ9.7XslAMTSfJ8iRVF6CZE5JA&limit=1";
    debugger;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            debugger;
            callback("Unable to connect!", undefined);
        } else if (body.message) {
            debugger;
            callback("No country input", undefined);
        } else if (!body.features.length) {
            debugger;
            callback("Country not found", undefined);
        } else {
            debugger;
            const { center, place_name } = body.features[0]; //important
            // console.log(center, place_name, body.features);
            const latitude = center[1];
            const longitude = center[0];
            callback(undefined, {
                latitude,
                longitude,
                place_name,
            });
        }
    });
};
exports.geoCode = geoCode;
