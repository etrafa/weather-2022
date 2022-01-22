"using strict";

const apiKey = "94A8CTBGN3WVZ2WT2QM776STB";
const openWeatherApiKey = "2a0334cc025c20d71ecdbe65179ae11f";

// CREATING DAILY WEATHER VARIABLES---//
const cityNameEl = document.querySelector(".city__name");
const mainTemperatureEl = document.querySelector(".main__temperature");
const mainWeatherDescriptionEl = document.querySelector(
  ".main__weather__description"
);
const mainMaxTemperatureEl = document.querySelector(".main__max__temperature");
const mainMinTemperatureEl = document.querySelector(".main__min__temperature");
const dailyWeatherContainer = document.getElementById("daily-weather");
const hourlyWeatherContainer = document.getElementById("hourly-weather");
const hourlyWeatherInformation = document.querySelector(
  ".hourly-weather-informations"
);
const dailyWeatherInformation = document.querySelector(
  ".daily-weather-informations"
);
const feelsLikeEl = document.querySelector(".feels-like");
const sunriseEl = document.querySelector(".sunrise");
const sunsetEl = document.querySelector(".sunset");
const windValueEl = document.querySelector(".wind-value");
const visibilityValueEl = document.querySelector(".visibility-value");
const humidityValueEl = document.querySelector(".humidity-value");
const pressureValueEl = document.querySelector(".pressure-value");
const celciusButton = document.querySelector(".celcius-button");
const fahrenheitButton = document.querySelector(".fahrenheit-button");

let dailyWeatherBody,
  dailyWeatherDate,
  dailyWeatherImage,
  dailyWeatherMinTemp,
  dailyWeatherMaxTemp,
  dailyTemperatureContainer,
  hourlyWeatherBody,
  hourlyWeatherDate,
  hourlyWeatherImage,
  hourlyTemperature;

// CREATING DAILY WEATHER ELEMENTS DYNAMICALLY---//
const createDailyWeatherElements = () => {
  dailyWeatherBody = document.createElement("div");
  dailyWeatherDate = document.createElement("p");
  dailyWeatherImage = document.createElement("img");
  dailyWeatherMinTemp = document.createElement("p");
  dailyWeatherMaxTemp = document.createElement("p");
  dailyTemperatureContainer = document.createElement("div");
  dailyWeatherBody.className = "daily-weather-body";
  dailyTemperatureContainer.className = "dailyTemperatureContainer";
  dailyWeatherBody.append(
    dailyWeatherDate,
    dailyWeatherImage,
    dailyTemperatureContainer
  );
  dailyTemperatureContainer.append(dailyWeatherMaxTemp, dailyWeatherMinTemp);
  dailyWeatherInformation.append(dailyWeatherBody);
};
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// CREATING HOURLY WEATHER ELEMENTS DYNAMICALLY---//

const createHourlyWeatherElements = () => {
  hourlyWeatherBody = document.createElement("div");
  hourlyWeatherDate = document.createElement("p");
  hourlyWeatherImage = document.createElement("img");
  hourlyTemperature = document.createElement("p");
  hourlyWeatherBody.className = "hourly-weather-body";
  hourlyWeatherBody.append(
    hourlyWeatherDate,
    hourlyWeatherImage,
    hourlyTemperature
  );
  hourlyWeatherInformation.append(hourlyWeatherBody);
};

// FETCHING HOURLY WEATHER DATA---//
const getHourlyWeather = (cityName, units) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=${openWeatherApiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i <= 23; i++) {
        createHourlyWeatherElements();
        hourlyWeatherDate.textContent = data.list[i].dt_txt.slice(10, 13);
        hourlyWeatherImage.src = `./assets/icons/${data.list[i].weather[0].icon}.png`;
        hourlyTemperature.textContent = `${Math.round(
          data.list[i].main.temp
        )}°`;
      }
      feelsLikeEl.textContent = `${Math.round(data.list[0].main.feels_like)}°`;
      windValueEl.textContent = `${Math.round(data.list[0].wind.speed)}km/h`;
      visibilityValueEl.textContent = `${data.list[0].visibility / 1000} km`;
      humidityValueEl.textContent = data.list[0].main.humidity;
      pressureValueEl.textContent = data.list[0].main.pressure;
    });
};
for (let i = 0; i <= 10; i++) {}
const weatherCallDaily = (cityName, units) => {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=${units}&key=${apiKey}&contentType=json`
  )
    .then((response) => response.json())
    .then((data) => {
      // FETCHING MAINLY DATA SECTION
      cityNameEl.textContent =
        data.address[0].toUpperCase() + data.address.slice(1);
      mainTemperatureEl.textContent = `${Math.round(
        data.currentConditions.temp
      )}°`;
      mainWeatherDescriptionEl.textContent = data.currentConditions.conditions;
      mainMaxTemperatureEl.textContent =
        "H: " + Math.round(data.days[0].tempmax) + "°";
      mainMinTemperatureEl.textContent =
        "L: " + Math.round(data.days[0].tempmin) + "°";

      // FETCHING DAILY DATA SECTION
      for (let i = 1; i <= 10; i++) {
        createDailyWeatherElements();
        let days = new Date(data.days[i].datetime);
        dailyWeatherDate.textContent = weekDays[days.getDay()];
        dailyWeatherImage.src = `./assets/weather-icons-api/${data.days[i].icon}.png`;
        dailyWeatherMaxTemp.textContent = `${Math.round(
          data.days[i].tempmax
        )}° /`;
        dailyWeatherMinTemp.textContent = `${Math.round(
          data.days[i].tempmin
        )}°`;
      }
      // FETCHING DETAILS DATA SECTION
      feelsLikeEl.textContent =
        Math.round(data.currentConditions.feelslike) + "°";

      sunriseEl.textContent = data.currentConditions.sunrise.slice(0, 5);
      sunsetEl.textContent = data.currentConditions.sunset.slice(0, 5);

      windValueEl.textContent = `${Math.round(
        data.currentConditions.windspeed
      )} km/h`;
      visibilityValueEl.textContent =
        Math.round(data.currentConditions.visibility) + " km";
      humidityValueEl.textContent =
        Math.round(data.currentConditions.humidity) + " %";
      pressureValueEl.textContent =
        Math.round(data.currentConditions.pressure) + " hPa";
    });
};

const searchIconEl = document.querySelector(".search__bar");
const searchInputEl = document.querySelector(".search__input");
const searchButtonEl = document.querySelector(".search-button");

searchIconEl.addEventListener("click", () => {
  searchInputEl.classList.toggle("search__input-deactive");
  searchButtonEl.classList.toggle("search-button");
});

getHourlyWeather("Istanbul", "metric");
weatherCallDaily("Istanbul", "metric");

const removeSettings = () => {
  hourlyWeatherInformation.remove(hourlyWeatherBody);
};

searchButtonEl.addEventListener("click", () => {
  getHourlyWeather(searchInputEl.value, "metric");
  weatherCallDaily(searchInputEl.value, "metric");
});

celciusButton.addEventListener("click", () => {
  removeSettings();
  getHourlyWeather(searchInputEl.value, "metric");
  weatherCallDaily(searchInputEl.value, "metric");
});

fahrenheitButton.addEventListener("click", () => {
  getHourlyWeather(searchInputEl.value, "fahrenheit");
  weatherCallDaily(searchInputEl.value, "us");
});
