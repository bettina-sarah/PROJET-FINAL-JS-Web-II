import { fetchData } from "./meteo-api";

let brasovButton;
let hanoiButton;


window.addEventListener("load", async () => {

    let weatherData = await fetchData(45.5019, 73.5674);
    let weatherData1 = await fetchData(45.64861, 25.60613);
    let weatherData2 = await fetchData(21.0245, 105.84117);
    let weatherData3 = await fetchData(30.06263, 31.24967);
    console.log(weatherData)
    console.log(weatherData1)
    console.log(weatherData2)
    console.log(weatherData3)



})

loadBrasov = () => {

}

loadHanoi = () => {

}


    