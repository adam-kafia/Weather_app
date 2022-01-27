const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=d7760b2069ce99d1a5ba1177c3e6d6b2&query=" +
        latitude +
        "," +
        longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
            debugger;
        } else {
            const { temperature, feelslike, humidity } = body.current;
            const weather_descriptions = body.current.weather_descriptions[0];
            const weather_icons = body.current.weather_icons[0];
            callback(undefined, {
                temperature,
                feelslike,
                weather_descriptions,
                humidity,
                weather_icons,
            });
        }
    });
};
exports.forecast = forecast;
