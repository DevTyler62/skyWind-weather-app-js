//------- Global values to be used
let i = 0;

const api = {
    key    : 'a5df2369e182a88c0a6905276d4f4e69',
    baseurl: 'https://api.openweathermap.org/data/2.5/'
}

const googleMapsApi = {
    key    : 'AIzaSyAKsesPhB7jJ2RFNIaBhv9kK2xDIDSgUqY',
    baseurl: 'https://maps.googleapis.com/maps/api/timezone/json?location='
}

const weatherValues = {
    mainTemp          : '',
    mainTempCel       : '',
    defaultMainTempCel: '',
    defaultForecastC  : [],
    forecastTemps    : [],
    unitTemp          : [],
    searchValue       : '',
    unit              : '',
    unitMain          : '',
}

const domStrings = {
    search          : document.querySelector('.location_input'),
    temp            : document.querySelector('.weather__temp .temp'),
    forecastTemp    : document.querySelectorAll('.forcast__entry .temp'),
    forecastTempText: document.getElementById(`temp-${i}`),
    condition       : document.querySelector('.weather__condition'),
    iconSplit       : document.getElementById('icon').className.split(/\s+/),
    icon            : document.getElementById('icon'),
    location        : document.querySelector('.weather__location'),
    todaysDate      : document.querySelector('.weather__date .date'),
}
domStrings.search.addEventListener('keypress', setQuery);

document.getElementById('myonoffswitch').addEventListener('click', () => {
    const value = document.getElementById('myonoffswitch').checked;

    if (value === true) {
        //console.log('fahernheit');
        weatherValues.unitMain = document.getElementById('unit-main');
        weatherValues.unitMain.innerText = '°F';
        displayFah();
    }
    else {
        //console.log('Celsius');
        weatherValues.unitMain = document.getElementById('unit-main');
        weatherValues.unitMain.innerText = '°C';
        displayCel();
    }
})

function setQuery(event) {
    if (event.keyCode === 13) {
        checkSwitchValue();
        getWeather(domStrings.search.value);
        getForecast(domStrings.search.value);
        weatherValues.searchValue = domStrings.search.value;
        clearField();
    }
}

function checkSwitchValue() {
    const value = document.getElementById('myonoffswitch').checked;
    //console.log(value)
    if (value === true) {
        //console.log('imperial');
        weatherValues.unit = 'imperial';
    }
    else {
        //console.log('metric');
        weatherValues.unit = 'metric';
    }
}

function getWeather(query) {
        fetch(`${api.baseurl}weather?q=${query}&units=${weatherValues.unit}&APPID=${api.key}`)
        .then(weather => {
            if (weather.ok === true) {
                return weather.json();
            } else {
                throw new Error('Invaild location seach')
            }
        }).then((weatherJson) => {
            displayWeather(weatherJson);
        })
        .catch((error) => {
            swal('Error', 'Invalid search location', 'error');
            weatherValues.searchValue = '';
            
        });
}

function getForecast(query) {
    fetch(`${api.baseurl}forecast?q=${query}&units=${weatherValues.unit}&APPID=${api.key}`)
    .then(forecast => {
        if (forecast.ok === true) {
            return forecast.json();
        } else {
            throw new Error('Invaild location seach')
        }
    }).then((forecastJson) => {
        displayForecast(forecastJson);
    })
    .catch((error) => {
        weatherValues.searchValue = '';
    });
}

function displayFah() {
    let fahTemp = [];
    let j = 0;

    weatherValues.defaultMainTempCel = domStrings.temp.innerText;
    if (weatherValues.defaultMainTempCel === '23' && weatherValues.searchValue === '') {
        displayFahDefault();
    }
    else {
        weatherValues.mainTempCel = domStrings.temp.innerText;
        let mainTempF = (weatherValues.mainTempCel * (9/5)) + 32;
        domStrings.temp.innerText = `${Math.round(mainTempF)}`;
        weatherValues.mainTemp = mainTempF;

        for (i = 0; i < domStrings.forecastTemp.length; i++) {
            weatherValues.unitTemp[i] = document.getElementById(`unit-${i}`);
            if (weatherValues.unit === 'imperial') {
                fahTemp[i] = weatherValues.forecastTemps[i];
            }
            else {
                fahTemp[i] = (weatherValues.forecastTemps[i] * (9/5)) + 32;
            }
            domStrings.forecastTemp[i].innerText = `${Math.round(fahTemp[i])}`;
            weatherValues.unitTemp[i].innerText = '°F';
            if (j === domStrings.forecastTemp.length) {
                break;
            }
            j++;
        }
    }
}

function displayCel() {
    let celTemp = [];
    let j = 0;

    weatherValues.defaultMainTempCel = domStrings.temp.innerText;
    if (weatherValues.defaultMainTempCel === '73' && weatherValues.searchValue === '') {
        displayCelDefault();
    }
    else {
        let mainTempC = (weatherValues.mainTemp - 32) * (5/9);
        domStrings.temp.innerText = `${Math.round(mainTempC)}`;
        weatherValues.mainTempCel = mainTempC;

        for (i = 0; i < domStrings.forecastTemp.length; i++) {
            weatherValues.unitTemp[i] = document.getElementById(`unit-${i}`);
            if (weatherValues.unit === 'imperial') {
                celTemp[i] = (weatherValues.forecastTemps[i] - 32) * (5/9);
            }
            else {
                celTemp[i] = weatherValues.forecastTemps[i];
            }
            domStrings.forecastTemp[i].innerText = `${Math.round(celTemp[i])}`;
            weatherValues.unitTemp[i].innerText = '°C';
            if (j === domStrings.forecastTemp.length) {
                break;
            }
            j++;
        }
    }
}

function displayCelDefault() {
    let j = 0;
    weatherValues.defaultMainTempCel = domStrings.temp.innerText;

    let defaultCel = (parseInt(weatherValues.defaultMainTempCel) - 32) * (5/9);
    domStrings.temp.innerText = `${Math.round(defaultCel)}`;

    for (i = 0; i < domStrings.forecastTemp.length; i++) {
        if (j === domStrings.forecastTemp.length) {
            break;
        }
        forecastTempText = document.getElementById(`temp-${i}`)
        weatherValues.unitTemp[i] = document.getElementById(`unit-${i}`);
        weatherValues.defaultForecastC[i] = forecastTempText.innerText;
        weatherValues.defaultForecastC[i] = (weatherValues.defaultForecastC[i] - 32) * (5/9);
        weatherValues.defaultForecastC[i] = Math.round(weatherValues.defaultForecastC[i]);
        domStrings.forecastTemp[i].innerText = `${Math.round(weatherValues.defaultForecastC[i])}`;
        weatherValues.unitTemp[i].innerText = '°C';
        j++;
    }
}

function displayFahDefault() {
    let j = 0;
    weatherValues.defaultMainTempCel = domStrings.temp.innerText;

    let defaultCel = (parseInt(weatherValues.defaultMainTempCel) * (9/5)) + 32;
    domStrings.temp.innerText = `${Math.round(defaultCel)}`;

    for (i = 0; i < domStrings.forecastTemp.length; i++) {
        if (j === domStrings.forecastTemp.length) {
            break;
        }
        forecastTempText = document.getElementById(`temp-${i}`)
        weatherValues.unitTemp[i] = document.getElementById(`unit-${i}`);
        weatherValues.defaultForecastC[i] = forecastTempText.innerText;
        weatherValues.defaultForecastC[i] = (weatherValues.defaultForecastC[i] * (9/5)) + 32;
        weatherValues.defaultForecastC[i] = Math.round(weatherValues.defaultForecastC[i]);
        domStrings.forecastTemp[i].innerText = `${Math.round(weatherValues.defaultForecastC[i])}`;
        weatherValues.unitTemp[i].innerText = '°F';
        j++;
    }
}

function displayWeather(weather) {
    //console.log(weather);
    const timeDate = new Date();
    const timeStamp = timeDate.getTime() / 1000 + timeDate.getTimezoneOffset() * 60;
    fetch(`${googleMapsApi.baseurl}${weather.coord.lat},${weather.coord.lon}&timestamp=${timeStamp}&key=${googleMapsApi.key}`)
    .then(time => {
        return time.json();
    }).then(checkTime);
    
    domStrings.condition.innerText = `${weather.weather[0].main}`;

    domStrings.icon.classList.remove(domStrings.iconSplit[1]);
    let iconID = weather.weather[0].id;
    domStrings.icon.classList.add(`wi-owm-${iconID}`);

    if (weatherValues.unit === 'imperial') {
        weatherValues.unitMain = document.getElementById('unit-main');
        //console.log(weatherValues.unitMain)
        weatherValues.unitMain.innerText = '°F';
    }
    else {
        weatherValues.unitMain = document.getElementById('unit-main');
        weatherValues.unitMain.innerText = '°C';
    }


    domStrings.temp.innerText = `${Math.round(weather.main.temp)}`;
    weatherValues.mainTemp = Math.round(weather.main.temp);
    //console.log(weatherValues);

    domStrings.location.innerText = `${weather.name}, ${weather.sys.country}`;

    let today = new Date();
    domStrings.todaysDate.innerText = dateFormatter(today);
   
}

function checkTime(time) {
    //console.log(time);
    const date = new Date();
    const timeStamp =date.getTime() / 1000 + date.getTimezoneOffset() * 60;
    //console.log(timeStamp);
    const offsets = (time.dstOffset * 1000) + (time.rawOffset * 1000);
    const localDate = (new Date((timeStamp * 1000) + offsets)).toTimeString();
    //console.log(localDate);
    const newDate = localDate.split(/[ :]+/); // Split the string based on coditons for both spaces and colons
                                              // This allows for the times to be split and for the time of day 
                                              // either AM or PM is also seperated.
    //console.log(newDate);
    if (newDate[0] >= 6 && newDate[0] <= 18) { // Check if the time is between 6 PM and 6 AM to set background
        document.body.style.backgroundImage = "url('./css/images/day.png')";
    }
    else {
        document.body.style.backgroundImage = "url('./css/images/night.png')";
        document.querySelector('.weather__temp').style.textShadow = '2px 10px #2D2D2D';
        document.querySelector('.weather__condition').style.textShadow = '2px 2px #2D2D2D';
        document.querySelector('.weather__icon-condition i').style.textShadow = '5px 4px #2D2D2D';
    }
}

function displayForecast(forecast) {
    //console.log(forecast);
    let j = 0;
    // Array of all the forecasts
    const forecastArray = [forecast.list];
    //console.log(forecastArray);

    // Temperature mapping
    const temps = forecastArray[0].map(forecast => {
        return forecast.main.temp;
    })
    //console.log(temps);
    weatherValues.forecastTemps = temps;
    //console.log(weatherValues.forecastTempsF);


    // Time Mapping
    const times = forecastArray[0].map(times => {
        return times.dt_txt.substring(11, 19); // SubString mthod used to take off date and just leave time
        //return times.dt_txt;
    })
    //console.log(times);

    // Icon mapping
    const iconArray = forecastArray[0].map(icons => {
        return icons.weather[0].id;
    })
    //console.log(iconArray);


    for (let i = 0; i < domStrings.forecastTemp.length; i++) {
        domStrings.forecastTemp[i].innerText = `${Math.round(temps[j])}`;
        if (j === domStrings.forecastTemp.length) {
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
    //console.log(time[0]);
    j = 0;
    for (let i = 0; i < total; i++) {
        subTime = time[i];
        hours[j] = Number(subTime[0]);
        j++;
    }
    //console.log(hours);
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
    //console.log(actualHours);
    j = 0;
    for (let i = 0; i < total; i++) {
        timeOfDay[j] = (hours[i] >= 12) ? ' p.m.' : ' a.m.';
        j++;
    }
    //console.log(timeOfDay);
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
