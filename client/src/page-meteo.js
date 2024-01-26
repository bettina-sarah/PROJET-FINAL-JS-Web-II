import { fetchData } from "./meteo-api";
import Snowflake from "./sprites/snowflake";
import Rain from "./sprites/Rain";
import Tornado from "./sprites/Tornado";

let brasovButton;
let hanoiButton;
let bergenButton;
let buttonArray = [];
let meteoWrapperNode;
let welcomeNode;
let cityNode;
let lightNode;
let infoWrapperNode;
let infoNode;

let weatherObject = {}; //objet vide qui se remplit dynamiquement comme le cache & cachekey dans le weatherapi

let spriteList = [];

let isRain;
let isSnow;
let isTumbleweed;
let isTornado;

let isNight;
let nightOpacity; //pour l'image d'aurore boréale


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

    });
})

const renderWelcome = () => {
    welcomeNode = document.querySelector("#welcome");
    let nom = localStorage.getItem("name");
    welcomeNode.innerHTML = "<h1>Bienvenue, " + nom + " !</h1> Choisir une ville pour continuer...";

}

const loadCity = (cityName) => {

    localStorage.setItem("city", cityName);
    meteoWrapperNode = document.querySelector("#meteo-wrapper");
    disableButton(buttonArray);
    cityNode = document.createElement("div");
    cityNode.classList.add("city"); //le wrapper commun pour tous les villes
    //pour les sprites
    cityNode.classList.add(cityName + "-cls");
    meteoWrapperNode.append(cityNode);
    //cityNode pour chaque ville. 

    welcomeNode.style.display = "none";


    goBack();

    //quel bouton est clické decide quelle info est cherché

    let testObject = {
        "time": "2024-01-25T23:45:00.000Z",
        "temperature": 26,
        "apparentTemperature": 0,
        "isDay": 0,
        "precipitation": 0,
        "rain": 0,
        "showers": 0,
        "snowfall": 0,
        "windSpeed10m": 20
    }
    checkWeather(testObject);

    //checkWeather(weatherObject[cityName]);



}


const disableButton = (array) => {
    array.forEach(button => {
        button.style.display = "none";
    });
}
const enableButton = (array) => {
    array.forEach(button => {
        button.style.display = "block";
    });
}

const goBack = () => {
    let backButton = document.createElement("button");
    backButton.classList.add("back");
    backButton.innerText = "Revenir en arrière";

    cityNode.append(backButton);

    backButton.onclick = () => {
        cityNode.remove();
        enableButton(buttonArray);
        welcomeNode.style.display = "block";
        spriteList = [];
    }

}

const checkWeather = (cityWeatherData) => {


    renderInfo(cityWeatherData);

    if (cityWeatherData.temperature < 0) {
        runWinter();
    }
    if (cityWeatherData.temperature > 25) { //tumbleweeds gentilles
        cityNode.classList.add("summer");
        if (cityWeatherData.windSpeed10m <= 15) {
            //run tumbleweeds slow...
        }

        else {
            //fast & Tornados
            runTornadoes();
        }
    }

    if (!cityWeatherData.isDay) {
        //change opacité ou bg img
        runNight();

    }

    if (cityWeatherData.rain > 0 || cityWeatherData.showers > 0) {
        runRain();
    }

    // what to insert: 
    if (cityWeatherData.snowfall > 0) {
        runSnow();
    }



}

const renderInfo = (object) => {
    infoWrapperNode = document.createElement("div");
    infoWrapperNode.classList.add("info-wrapper");


    infoNode = document.createElement("div");
    infoNode.classList.add("info");
    let city = localStorage.getItem("city");
    infoNode.innerHTML = "<h2>Météo pour <span>" + city + "</span></h2><br>" +
        "<div>Temperature: " + object.temperature + "°C</div><br>Pluie: " + object.rain + " mm<br>Neige: " +
        object.snowfall + " mm<br>Vitesse du vent: " + object.windSpeed10m + " m";
    console.log(object)

    infoWrapperNode.append(infoNode);
    cityNode.append(infoWrapperNode);



}

const runWinter = () => {
    cityNode.classList.add("winter");
    //scrap avec son acorn
}

// const runSummer = () => {

// }

const runTornadoes = () => {
    spriteList.push(new Tornado());
    isTornado = true;
}

const runNight = () => {

    if (cityNode.classList.contains("bergen-cls")) {
        lightNode = document.createElement("div");
        lightNode.classList.add("light");
        cityNode.append(lightNode);
    }
    cityNode.classList.add("night");
    isNight = true;
    nightOpacity = 0.05;

    generalTick();

}

const runSnow = () => {
    spriteList.push(new Snowflake());
    isSnow = true;
    generalTick();

}

const runRain = () => {
    cityNode.classList.add("storm");
    spriteList.push(new Rain());
    isRain = true;
    generalTick();

}

const generalTick = () => {

    if (isNight) {
        if (nightOpacity < 1) {
            nightOpacity += 0.005;
        }
        else {
            nightOpacity = 1;
        }
        if (lightNode) {
            lightNode.style.opacity = nightOpacity;
        }

    }

    if (isSnow) {
        spawnSprites(Snowflake, 0.2);
    }
    if (isRain) {
        spawnSprites(Rain, 1);
    }
    if (isTornado) {
        spawnSprites(Tornado, 0.06);
    }

    for (let i = 0; i < spriteList.length; i++) {
        if (!spriteList[i].tick()) {
            spriteList.splice(i, 1);
            i--;
        }
    }
    window.requestAnimationFrame(generalTick);
}

const spawnSprites = (Class, chance) => {
    if (Math.random() < chance) { //1 chance sur 10
        spriteList.push(new Class());
    }
}
