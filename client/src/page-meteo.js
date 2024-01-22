import { fetchData } from "./meteo-api";

window.addEventListener("load", async () => {
    let weatherData = await fetchData(45.5019, 73.5674);
    console.log(weatherData)
})
    