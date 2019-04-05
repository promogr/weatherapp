const apikey = '451406fc52db34b3f4ae3d843b639f41';
const apiurl = 'https://api.darksky.net/forecast/'
const proxy = 'https://cors-anywhere.herokuapp.com/';

//DOM Element vars
let temp, tempDesc, tempDegree, tempSpan, locTz, myIcon;

document.addEventListener("DOMContentLoaded", function(event) {
    let lat;
    let lon;
    temp = document.querySelector('.temp');
    tempDesc = document.querySelector('.temp-desc');
    tempDegree = document.querySelector('.temp-degree');
    locTz = document.querySelector('.loc-tz');
    myIcon = document.querySelector('.icon');
    tempSpan = document.querySelector('.temp span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;
            getWeather(lat, lon);
        });
    } else {
        //todo message to user... no GPS
    }

});

function getWeather(lat, lon) {
    let url = proxy + apiurl + apikey + '/' + lat + ',' + lon;
    fetch(url, {
            // mode: 'no-cors',
            headers: { 'Origin': 'http://masterpro.gr:5500' },
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const { temperature, summary, icon } = data.currently;

            //Set DOM Elements with data
            tempDegree.textContent = Math.floor((temperature - 32) * 5 / 9); //convert to C
            tempDesc.textContent = summary;
            locTz.textContent = data.timezone;
            setIcon(icon, myIcon);
            degreeSwitch(temperature);

        })
}

function setIcon(icon, iconEle) {
    const skycons = new Skycons({
        color: "white",
        "resizeClear": true
    })
    const currIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconEle, Skycons[currIcon]);

}

//Switch temp units
function degreeSwitch(tempF) {
    let celsius = Math.floor((tempF - 32) * 5 / 9);

    temp.addEventListener('click', () => {
        if (tempSpan.textContent === 'C') {
            tempSpan.textContent = 'F';
            tempDegree.textContent = tempF;
        } else {
            tempSpan.textContent = 'C';
            tempDegree.textContent = celsius;
        }
    });


}