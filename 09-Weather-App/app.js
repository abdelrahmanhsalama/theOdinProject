const backendFuncs = (function () {
    const getData = async function (city) {
        let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=ZQMV7KEMTW5E2HUGXYW7GJHFV&contentType=json`;

        try {
            let data = await fetch(url);
            console.log(data);
            if (!data.ok) {
                throw new Error("Error!");
            }
            let jsonData = await data.json();
            return jsonData;
        } catch (error) {
            return { error: error.message };
        }
    };

    return { getData };
})();



const frontendFuncs = (function () {
    let currentCityName = document.querySelector("#current-weather-city");
    let currentCityAddress = document.querySelector("#current-weather-address");
    let currentCityTemp = document.querySelector("#current-weather-temp");
    let currentCityDesc = document.querySelector("#current-weather-desc");
    let currentCityIcon = document.querySelector("#current-weather-icon");
    let switchTemp = document.querySelector("#switch-temp");

    let tempPref = true;
    let currentTemp;

    const displayData = async function (city) {
        let returnedData = await backendFuncs.getData(city);

        if (returnedData.error) {
            currentCityName.textContent = returnedData.error;
            currentCityAddress.textContent = "...";
            currentCityTemp.textContent = "...";
            currentCityDesc.textContent = "...";
            currentCityIcon.textContent = "😶‍🌫️";
        } else {
            currentTemp = returnedData.days[0].temp;
            let currentIcon = frontendFuncs.iconFunc(returnedData.days[0].conditions);

            currentCityName.textContent = returnedData.address;
            currentCityAddress.textContent = returnedData.resolvedAddress;

            let arabicRegex = /[\u0600-\u06FF]/;
            if (arabicRegex.test(currentCityName.textContent)) {
                currentCityName.textContent = currentCityName.textContent.replace(/,/g, "،");
            }
            if (arabicRegex.test(currentCityAddress.textContent)) {
                currentCityAddress.textContent = currentCityAddress.textContent.replace(/,/g, "،");
            }

            currentCityTemp.textContent = currentTemp + "°C";
            frontendFuncs.checkTempPref();
            currentCityDesc.textContent = returnedData.days[0].conditions;
            currentCityIcon.textContent = currentIcon;
        }
    }

    const iconFunc = function (returnedCondition) {
        if (returnedCondition == "Blowing Or Drifting Snow" || returnedCondition == "Heavy Freezing Drizzle/Freezing Rain" || returnedCondition == "Light Freezing Drizzle/Freezing Rain" || returnedCondition == "Freezing Fog" || returnedCondition == "Heavy Freezing Rain" || returnedCondition == "Light Freezing Rain" || returnedCondition == "Ice" || returnedCondition == "Snow" || returnedCondition == "Snow Showers" || returnedCondition == "Snow And Rain Showers" || returnedCondition == "Heavy Snow" || returnedCondition == "Light Snow" || returnedCondition == "Squalls" || returnedCondition == "Diamond Dust") {
            return "❄️";
        } else if (returnedCondition == "Drizzle" || returnedCondition == "Light Drizzle" || returnedCondition == "Heavy Drizzle" || returnedCondition == "Precipitation In Vicinity" || returnedCondition == "Rain" || returnedCondition == "Heavy Rain And Snow" || returnedCondition == "Light Rain And Snow" || returnedCondition == "Rain Showers" || returnedCondition == "Heavy Rain" || returnedCondition == "Light Rain" || returnedCondition == "Heavy Drizzle/Rain" || returnedCondition == "Light Drizzle/Rain" || returnedCondition == "Freezing Drizzle/Freezing Rain") {
            return "🌧️";
        } else if (returnedCondition == "Thunderstorm" || returnedCondition == "Thunderstorm Without Precipitation" || returnedCondition == "Hail Showers") {
            return "⛈️";
        } else if (returnedCondition == "Funnel Cloud/Tornado") {
            return "🌪️";
        } else if (returnedCondition == "Hail") {
            return "🌨️";
        } else if (returnedCondition == "Lightning Without Thunder") {
            return "⚡️";
        } else if (returnedCondition == "Mist" || returnedCondition == "Fog" || returnedCondition == "Freezing Fog") {
            return "🌫️";
        } else if (returnedCondition == "Dust storm" || returnedCondition == "Smoke Or Haze") {
            return "🌪️";
        } else if (returnedCondition == "Sky Coverage Decreasing") {
            return "⛅";
        } else if (returnedCondition == "Sky Coverage Increasing") {
            return "🌥️";
        } else if (returnedCondition == "Sky Unchanged" || returnedCondition == "Overcast") {
            return "☁️";
        } else if (returnedCondition == "Partially cloudy") {
            return "🌤️";
        } else if (returnedCondition == "Clear") {
            return "☀️";
        } else {
            return "😶‍🌫️";
        }
    }

    const checkTempPref = function () {


        if (frontendFuncs.tempPref) {
            currentCityTemp.textContent = currentTemp.toFixed() + "°C";
            switchTemp.textContent = "Switch to Fahrenheit";
        } else {
            currentCityTemp.textContent = ((currentTemp * 9 / 5) + 32).toFixed() + "°F";
            switchTemp.textContent = "Switch to Celsius";
        }
    }

    return { displayData, iconFunc, tempPref, checkTempPref };
})();

const initApp = (function () {
    frontendFuncs.displayData("Cairo");

    let searchInput = document.querySelector("#search-input");
    let searchButton = document.querySelector("#search-button");

    async function triggerSearch() {
        let currentCityName = document.querySelector("#current-weather-city");
        let currentCityAddress = document.querySelector("#current-weather-address");
        let currentCityTemp = document.querySelector("#current-weather-temp");
        let currentCityDesc = document.querySelector("#current-weather-desc");
        let currentCityIcon = document.querySelector("#current-weather-icon");

        let city = searchInput.value.trim();
        if (city == "") {
            return;
        }

        currentCityName.textContent = "Loading...";
        currentCityAddress.textContent = "...";
        currentCityTemp.textContent = "...";
        currentCityDesc.textContent = "...";
        currentCityIcon.textContent = "😶‍🌫️";

        await frontendFuncs.displayData(city);
    }

    searchInput.addEventListener("keydown", async(e) => {
        if (e.key == "Enter") {
            triggerSearch();
        }
    })

    searchButton.addEventListener("click", async () => {
        triggerSearch();
    })

    let switchTemp = document.querySelector("#switch-temp");

    switchTemp.addEventListener("click", () => {
        frontendFuncs.tempPref = !frontendFuncs.tempPref;
        frontendFuncs.checkTempPref();
    });
})();