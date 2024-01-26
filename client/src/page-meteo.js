import { fetchData } from "./meteo-api";
import Snowflake from "./sprites/snowflake";
import Rain from "./sprites/Rain";
import Tornado from "./sprites/Tornado";
import Scrat from "./sprites/Scrat";
import Acorn from "./sprites/Acorn";

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

let testButtonArray = [];

let weatherObject = {}; //objet vide qui se remplit dynamiquement comme le cache & cachekey dans le weatherapi

let spriteList = [];
let acornSprite;

let isRain;
let isSnow;
let isWinter;
let isTornado;

let isStarted=false;

let isNight;
let nightOpacity; //pour l'image d'aurore boréale


window.addEventListener("load", async () => {

    weatherObject.brasov = await fetchData(45.64861, 25.60613);
    weatherObject.hanoi = await fetchData(21.0245, 105.84117);
    weatherObject.bergen = await fetchData(60.397076, 5.324383);

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
        "temperature": -1,
        "apparentTemperature": 0,
        "isDay": 0,
        "precipitation": 0,
        "rain": 0,
        "showers": 0,
        "snowfall": 6,
        "windSpeed10m": 0
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


    makeTestButton(cityWeatherData);

    renderInfo(cityWeatherData);

    if (cityWeatherData.temperature < 0) {
        runWinter();
    }
    else{
        isWinter=false;
    }
    if (cityWeatherData.temperature > 25) { //tumbleweeds gentilles
        cityNode.classList.add("summer");
        if (cityWeatherData.windSpeed10m > 15) {
            runTornadoes();  
        }
        else{
            isTornado=false;
        }
    }

    if(cityWeatherData.windSpeed10m > 15){
        runTornadoes();
    }
    else{
        isTornado=false;
    }

    if (!cityWeatherData.isDay) {
        //change opacité ou bg img
        runNight();
    }
    else{
        isNight=false;
    }

    if (cityWeatherData.rain > 0 || cityWeatherData.showers > 0) {
        runRain();
    }
    else{
        isRain=false;
    }


    // what to insert: 
    if (cityWeatherData.snowfall > 0) {
        runSnow();
    }
    else{
        isSnow=false;
    }
}

const makeTestButton = (weatherData) => {


    testButtonArray.forEach(button => {
        button.remove();
    });

    testButtonArray = [];

    let buttonNumber = 7;
    for (let i = 1; i <= buttonNumber; i++) {

        let testButton = document.createElement("button");
        testButton.classList.add("test");
        testButtonArray.push(testButton);
    }

    testButtonArray[0].innerText = "Temperature: " + weatherData.temperature;
    if(weatherData.isDay===0){
        testButtonArray[1].innerText = "Jour/Nuit: Nuit";
    }
    else{
        testButtonArray[1].innerText = "Jour/Nuit: Jour";
    }
    
    testButtonArray[2].innerText = "Precipitation: " + weatherData.precipitation;
    testButtonArray[3].innerText = "Pluie: " + weatherData.rain;
    testButtonArray[4].innerText = "Showers: " + weatherData.showers;
    testButtonArray[5].innerText = "Neige: " + weatherData.snowfall;
    testButtonArray[6].innerText = "Vitesse du vent: " + weatherData.windSpeed10m;

    testButtonArray.forEach(button => {
        cityNode.append(button);
    });

    testButtonArray.forEach((button, i) => {
        clickTestButton(button, i);
    });

}
const clickTestButton = (testbutton, index) => {
    testbutton.onclick = () => {
        let testObject = {
            "time": "2024-01-25T23:45:00.000Z",
            "temperature": -1,
            "apparentTemperature": 0,
            "isDay": 0,
            "precipitation": 0,
            "rain": 0,
            "showers": 0,
            "snowfall": 6,
            "windSpeed10m": 0
        }

        testObject.temperature = index ==0 ? -1 : 30; //temp
        testObject.isDay = index ==1 ? 1 : 0; //jour Nuit
        testObject.precipitation = index ==2 ? 0 : 5; //precipitation
        testObject.rain = index ==3 ? 0 : 5; //pluie
        testObject.showers = index ==4 ? 0 : 5; //showers
        testObject.snowfall = index ==5 ? 0 : 5; //snow
        testObject.windSpeed10m = index ==6 ? 0 : 20; //windspeed
        
        
        checkWeather(testObject);
    }
}

const renderInfo = (object) => {
    
    if(infoWrapperNode){
        infoWrapperNode.remove();
    }

    infoWrapperNode = document.createElement("div");
    infoWrapperNode.classList.add("info-wrapper");


    infoNode = document.createElement("div");
    infoNode.classList.add("info");
    let city = localStorage.getItem("city");
    infoNode.innerHTML = "<h2>Météo pour <span>" + city + "</span></h2><br>" +
        "<div>Temperature: " + object.temperature + "°C</div><br>Pluie: " + object.rain + " mm<br>Neige: " +
        object.snowfall + " cm<br>Vitesse du vent: " + object.windSpeed10m + " m";
    console.log(object)

    infoWrapperNode.append(infoNode);
    cityNode.append(infoWrapperNode);



}

const runWinter = () => {
    

    if(isWinter){
        cityNode.classList.add("winter");
        spriteList.push(new Scrat());
        acornSprite = new Acorn();
        spriteList.push(acornSprite);
        generalTick();
    }
     
}

const runTornadoes = () => {
    spriteList.push(new Tornado());
    isTornado = true;

    generalTick();
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
    if(!isStarted){ //si pas commencé ... 
        generalTick();
    }
}

const runRain = () => {
    cityNode.classList.add("storm");
    spriteList.push(new Rain());
    isRain = true;

    generalTick();

}

const generalTick = () => {

    isStarted=true;

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



    //tick pour acorn et scrat: collision

    for (let i = 0; i < spriteList.length; i++) {
        if(spriteList[i].spriteType == "scrat"){
            let scrat = spriteList[i];
            if(scrat.currentX > acornSprite.currentX - acornSprite.width){
                scrat.findAcorn = true;
                acornSprite.isFound = true;
                setTimeout( () => {
                    makeScratHappy(scrat);
                }, 2200);
                
            } 
        }
        if (!spriteList[i].tick()) {
            spriteList.splice(i, 1);
            i--;
        }
    }
    window.requestAnimationFrame(generalTick);
}

const makeScratHappy = (Class) => {
    Class.grabAcorn = true;
}

const spawnSprites = (Class, chance) => {
    if (Math.random() < chance) { //1 chance sur 10-
        spriteList.push(new Class());
    }
}
