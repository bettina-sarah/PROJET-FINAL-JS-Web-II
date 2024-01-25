import { fetchData } from "./meteo-api";
import Snowflake from "./sprites/snowflake";

let brasovButton;
let hanoiButton;
let bergenButton;
let buttonArray = [];
let meteoWrapperNode;
let welcomeNode;

let weatherObject = {}; //objet vide qui se remplit dynamiquement comme le cache & cachekey dans le weatherapi

let snowflakeList = [];


window.addEventListener("load", async () => {


    weatherObject.brasov = await fetchData(40.7128, -74.006); //isday1
    //weatherObject.brasov = await fetchData(45.64861, 25.60613);
    weatherObject.hanoi = await fetchData(35.6764, 139.65); //isday0
    // weatherObject.hanoi = await fetchData(21.0245, 105.84117);
    weatherObject.bergen = await fetchData(30.06263, 31.24967);

    brasovButton = document.querySelector("#brasov");
    hanoiButton = document.querySelector("#hanoi");
    bergenButton = document.querySelector("#bergen");
    buttonArray = [brasovButton, hanoiButton, bergenButton];

    renderWelcome();

    buttonArray.forEach(button => {
        button.onclick = (event) => {
            loadCity(event.target.id);
        }
        //opacity changes red and blue w temperatures div Overs
    });
})

const renderWelcome = () => {
    welcomeNode = document.querySelector("#welcome");
    let nom = localStorage.getItem("name");
    welcomeNode.textContent = "Bienvenue, " + nom + "!";

}

const loadCity = (cityName) => {
    meteoWrapperNode = document.querySelector("#meteo-wrapper");
    disableButton(buttonArray);
    let cityNode = document.createElement("div");
    cityNode.classList.add("city"); //le wrapper commun pour tous les villes
    //pour les sprites
    cityNode.classList.add(cityName + "-cls");
    meteoWrapperNode.append(cityNode);
    //cityNode pour chaque ville. 

    welcomeNode.style.display = "none";

    //quel bouton est clické decide quelle info est cherché

    //add cityName as param
    checkWeather(weatherObject[cityName]);



}


const disableButton = (array) => {
    array.forEach(button => {
        button.style.display = "none";
    });
}

// time:
// temperature: Math.round(current.variables(0).value()),
// apparentTemperature: Math.round(current.variables(1).value()),
// isDay: Math.round(current.variables(2).value()),
// precipitation: Math.round(current.variables(3).value()),
// rain: Math.round(current.variables(4).value()),
// showers: Math.round(current.variables(5).value()),
// snowfall: Math.round(current.variables(6).value()),
// windSpeed10m: Math.round(current.variables(7).value()),

//add city as param for checkweather
const checkWeather = (cityWeatherData) => {
    // if (cityWeatherData.temperature < 0) {
    //     //runWinter(city);
    // }
    // if (cityWeatherData.temperature > 25 && cityWeatherData.windSpeed10m <= 15) { //tumbleweeds gentilles
    //     //runSummer(city);
    // }
    // if (!cityWeatherData.isDay) {
    //     //change opacité ou bg img
    //     //bergen: nord lights
    // }

    // if (cityWeatherData.rain > 0 || cityWeatherData.showers > 0) {
    //     // spawn raindrops
    // }

    //what to insert: cityWeatherData.snowfall > 0
    let snow = 15;
    if (snow > 0) {
        runSnow();
    }

    // if (cityWeatherData.windSpeed10m > 15 && cityWeatherData.temperature > 25) { //tumbleweeds aggresives


    // }


}

// const runWinter = (city) => {
//     //city for wallpaper change!
//     //scrap avec son acorn

// }

// const runSummer = (city) => {

// }

const runSnow = () => {

    snowflakeList.push(new Snowflake());
    generalTick();


}

const generalTick = () => {

    if (Math.random() < 0.2) { //1 chance sur 10
        snowflakeList.push(new Snowflake());
    }

    for (let i = 0; i < snowflakeList.length; i++) {
        if (!snowflakeList[i].tick()) {
            snowflakeList.splice(i, 1);
            i--;
        }
    }
    window.requestAnimationFrame(generalTick);
}
