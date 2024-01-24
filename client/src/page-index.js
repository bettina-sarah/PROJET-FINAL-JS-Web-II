
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
let wrapperNode;
let imageDiv;
let passwordField;
let submitButton;
let eventCounter=0;

let spriteList = [];

window.addEventListener("load", () => {
    wrapperNode = document.querySelector("#wrapper");
    
    passwordValidation();

    spawnForestSpirit();

    tick();

})

const passwordValidation = () => {

    passwordField = document.querySelector("#password");
    submitButton = document.querySelector("#submit");
                    
    document.querySelector("#password-form").onsubmit = () => {
        let success = true;

        if (document.querySelector("#password").value !== "web2") {
            success = false;
            console.log("false")
            document.querySelector("#error-message").style.display = "block";
            annoyingImage();
            passwordField.disabled = true;
            submitButton.disabled = true;
            finePrint();
        }

        return success;
    }
}

const annoyingImage = () => {
    
    imageDiv = document.createElement("div");
    imageDiv.classList.add("annoying-image");
    imageDiv.style.top = Math.random()*innerHeight - 500 + "px";
    imageDiv.style.left = Math.random()*innerWidth - 500 + "px";
    wrapperNode.append(imageDiv);

    setInterval(float, 1000);
}

const float = () => {

    imageDiv.style.top = Math.random()*innerHeight - 500 + "px";
    imageDiv.style.left = Math.random()*innerWidth - 500 + "px";
}

const finePrint = () => {
    let finePrint = document.createElement("div");
    finePrint.classList.add("fine-print");
    finePrint.innerText = "Appuyez ici pour réactiver le mot de passe";

    finePrint.style.bottom = "20px";
    finePrint.style.right = "0px";
    wrapperNode.append(finePrint);

    finePrint.onclick = () => {
        finePrint.style.color = "rgb(26, 151, 109)";
        finePrint.style.boxShadow = "5px 10px rgb(26, 151, 109)";
        passwordField.disabled = false;
        submitButton.disabled = false;
        document.querySelector("#error-message").style.display = "none";
        imageDiv.remove();
        spriteList = [];

        //le div fine-print s'enleve pas tout de suite
        setTimeout( () => {
            finePrint.remove();}, 600);
    }
}


const spawnForestSpirit = () => {
    document.onmouseover = (event) => {
        eventCounter++;
        if(eventCounter%3==0){ //juste a chaque 5 events spawn un spirit
            spriteList.push(new ForestSpirit(event.x, event.y));
        }       
}
}

    
const tick = () => {


    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        if(!sprite.tick()){
            spriteList.splice(i,1);
            i--;
        }
    }
    window.requestAnimationFrame(tick);
}