import { fetchData } from "./meteo-api";

let brasovButton;
let hanoiButton;
let bergenButton;
let buttonArray = [];
let meteoWrapperNode;


window.addEventListener("load", async () => {

    let weatherData1 = await fetchData(45.64861, 25.60613);
    let weatherData2 = await fetchData(21.0245, 105.84117);
    let weatherData3 = await fetchData(30.06263, 31.24967);

    brasovButton = document.querySelector("#brasov");
    hanoiButton = document.querySelector("#hanoi");
    bergenButton = document.querySelector("#bergen");
    buttonArray = [brasovButton, hanoiButton, bergenButton];

    buttonArray.forEach(button => {
        button.onclick = (event) => {
            loadCity(event.target.id);
        }
        //opacity changes red and blue w temperatures div Overs
    })
})

const loadCity = (cityName) => {
    meteoWrapperNode = document.querySelector("#meteo-wrapper");
    disableButton(buttonArray);
    let cityNode = document.createElement("div");
    cityNode.classList.add(cityName + "-cls");
    meteoWrapperNode.append(cityNode);

}


const disableButton = (array) => {
    array.forEach(button => {
        button.style.display = "none";
    });
}
