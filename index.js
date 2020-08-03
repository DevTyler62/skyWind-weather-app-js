const api = {
    key: 'a5df2369e182a88c0a6905276d4f4e69',
    baseurl: 'https://api.openweathermap.org/data/2.5/'
}

const search = document.querySelector('.location_input');
search.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode === 13) {
        getWeather(search.value);
        getForecast(search.value);
        clearField();
    }
}

function getWeather(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        //console.log(weather);
        return weather.json();
    }).then(displayWeather);
}

function getForecast(query) {
    fetch(`${api.baseurl}forecast?q=${query}&units=imperial&APPID=${api.key}`)
    .then(forecast => {
        return forecast.json();
    }).then(displayForecast)
}

function displayWeather(weather) {
    console.log(weather);
    
    const condition = document.querySelector('.weather__condition');
    condition.innerText = `${weather.weather[0].main}`;

    const iconSplit = document.getElementById('icon').className.split(/\s+/);
    console.log(iconSplit);
    const icon = document.getElementById('icon');
    icon.classList.remove(iconSplit[1]);
    let iconID = weather.weather[0].id;
    icon.classList.add(`wi-owm-${iconID}`);

    const temp = document.querySelector('.weather__temp .temp');
    temp.innerText = `${Math.round(weather.main.temp)}°F`;

    const location = document.querySelector('.weather__location');
    location.innerText = `${weather.name}, ${weather.sys.country}`;

    let today = new Date();
    let todaysDate = document.querySelector('.weather__date .date');
    todaysDate.innerText = dateFormatter(today);

    const unixTime = weather.sys.sunrise;
    const date = new Date(unixTime * 1000);
    console.log(date.toLocaleTimeString('en-US'));
   
}

function displayForecast(forecast) {
    console.log(forecast);
    let j = 0;
    // Array of all the forecasts
    const forecastArray = [forecast.list];
    //console.log(forecastArray);

    // Temperature mapping
    const temps = forecastArray[0].map(forecast => {
        return forecast.main.temp;
    })
    //console.log(temps);

    // Time Mapping
    const times = forecastArray[0].map(times => {
        return times.dt_txt.substring(11, 19); // SubString mthod used to take off date and just leave time
        //return times.dt_txt;
    })
    console.log(times);

    // Icon mapping
    const iconArray = forecastArray[0].map(icons => {
        return icons.weather[0].id;
    })
    console.log(iconArray);

    const forecastTemp = document.querySelectorAll('.forcast__entry .temp');

    for (let i = 0; i < forecastTemp.length; i++) {
        forecastTemp[i].innerText = `${Math.round(temps[j])}`;
        if (j === forecastTemp.length) {
            break;
        }
        j++;
    }

    forecastIconMapping(iconArray);
    forecastTimeMapping(times);
    

}

function forecastIconMapping(iconArray) {
    let totalIcons = 7;
    let iconArrayNum = 0;
    let iconNum = 0;

    for (let i = 0; i < totalIcons; i++) {
        const iconSplit = document.getElementById(`icon-forcast-${iconNum}`).className.split(/\s+/);
        const icon = document.getElementById(`icon-forcast-${iconNum}`);
        icon.classList.remove(iconSplit[1]);
        let iconID = iconArray[iconArrayNum];
        icon.classList.add(`wi-owm-${iconID}`);
        iconNum++;
        iconArrayNum++;
    }
}

function forecastTimeMapping(times) {
    let time = [];
    let j = 0;
    let hourNum = 0;
    let total = 7;
    let subTime;
    let hours = [];
    let actualHours = [];
    let timeOfDay = [];

    for (let i = 0; i < times.length; i++) {
        time[j] = times[i].split(':');
        j++;
    }
    console.log(time[0]);
    j = 0;
    for (let i = 0; i < total; i++) {
        subTime = time[i];
        hours[j] = Number(subTime[0]);
        j++;
    }
    console.log(hours);
    j = 0;
    for (let i = 0; i < total; i++) {
        if (hours[i] > 0 && hours[i] <= 12) {
            actualHours[j] = hours[i];
        } else if (hours[i] > 12) {
            actualHours[j] = (hours[i] - 12);
        } else if (hours[i] == 0) {
            actualHours[j] = 12;
        }
        j++;
    }
    console.log(actualHours);
    j = 0;
    for (let i = 0; i < total; i++) {
        timeOfDay[j] = (hours[i] >= 12) ? ' p.m.' : ' a.m.';
        j++;
    }
    console.log(timeOfDay);
    j = 0;
    for (let i = 0; i < total; i++) {
        const hourHtml = document.getElementById(`hour-${hourNum}`);
        hourHtml.textContent = actualHours[j];
        const amPM = document.getElementById(`day-${hourNum}`);
        amPM.textContent = `00 ${timeOfDay[j]}`;
        j++;
        hourNum++;
    }
}

function dateFormatter(date) {
    let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let weekDay = days[date.getDay()];
    let numDay = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${weekDay} ${month} ${numDay}`;
}

function clearField() {
    document.getElementById('input').value = ''; // clears the input field
    document.getElementById('input').blur(); // Blur -- takes the focus off of the focused input
}
