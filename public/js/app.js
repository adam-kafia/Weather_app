console.log("Client side JS");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
const img = document.getElementById("weather_img");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    p1.textContent = "Loading Data";
    p2.textContent = "";
    img.src = "";

    fetch("/weather?adress=" + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return (p1.textContent = data.error);
            }
            console.log(data);
            img.src = data.weather_icons;
            p1.textContent =
                "Address: " +
                data.place_name +
                " Latitude: " +
                data.latitude +
                " longitude: " +
                data.longitude;
            p2.textContent =
                "It's now " +
                data.temperature +
                " degrees, feels like " +
                data.feelslike +
                ". " +
                "It's " +
                data.weather_descriptions +
                " outisde. humidity is " +
                data.humidity +
                " %.";
        });
    });
});
