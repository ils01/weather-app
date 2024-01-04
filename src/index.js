import "./style.scss";

const locationInput = document.getElementById("location");
const locationButton = document.getElementById("locationbtn");
const locationStatus = document.querySelector(".location__status");

const API_KEY = "578b30a96e274df0b6a173042230812";

let currentData;
let currentDegreeUnit = "c";
let currentSpeedType = "kph";

function getData(location) {
	locationStatus.textContent = "loading...";
	fetch(
		`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
	)
		.then(function(response) {
			console.log("here");
			return response.json();
		})
		.then(function(data) {
			currentData = {
				country: data.location.country,
				city: data.location.name,
				feelslike_c: data.current.feelslike_c,
				feelslike_f: data.current.feelslike_f,
				temp_c: data.current.temp_c,
				temp_f: data.current.temp_f,
				humidity: data.current.humidity,
				wind_kph: data.current.wind_kph,
				wind_mph: data.current.wind_mph,
			};
			locationStatus.textContent = "";
			setData();
		})
		.catch((error) => {
			locationStatus.textContent = "couldn't find your location";
			console.log("couldnt find forecast for this location");
		});
}
getData("London");

locationButton.addEventListener("click", () => getData(locationInput.value));

const countryCityElement = document.querySelector(".forecast__title");

const tempUnitElements = document.querySelectorAll(".temp__unit");
const tempElement = document.querySelector(".item__temp");
const tempFeelsLikeElement = document.querySelector(".item__feels_like");

const humidityElement = document.querySelector(".item__humidity");

const windElement = document.querySelector(".item__wind");
const windUnitElement = document.querySelector(".wind__unit");
const degreeButton = document.querySelector(".button--degree");
const speedButton = document.querySelector(".button--speed");

function setData() {
	countryCityElement.textContent = `${currentData.country}, ${currentData.city}`;
	tempUnitElements.forEach(
		(elt) => (elt.textContent = "°" + currentDegreeUnit.toUpperCase())
	);
	tempElement.textContent = currentData[`temp_${currentDegreeUnit}`];
	tempFeelsLikeElement.textContent =
		currentData[`feelslike_${currentDegreeUnit}`];
	humidityElement.textContent = currentData.humidity;
	windElement.textContent = currentData[`wind_${currentSpeedType}`];
	windUnitElement.textContent = currentSpeedType;
	if (currentDegreeUnit === "f") {
		degreeButton.textContent = "change to °C";
	} else {
		degreeButton.textContent = "change to °F";
	}

	if (currentSpeedType === "kph") {
		speedButton.textContent = "change to mph";
	} else {
		speedButton.textContent = "change to kph";
	}
}

function changeDegreeType() {
	if (currentDegreeUnit === "c") {
		currentDegreeUnit = "f";
	} else {
		currentDegreeUnit = "c";
	}
	setData();
}
function changeSpeedType() {
	if (currentSpeedType === "kph") {
		currentSpeedType = "mph";
	} else {
		currentSpeedType = "kph";
	}
	setData();
}

degreeButton.addEventListener("click", changeDegreeType);
speedButton.addEventListener("click", changeSpeedType);
