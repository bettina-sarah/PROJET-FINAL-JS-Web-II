
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
let wrapperNode;
let imageDiv;
let passwordField;
let submitButton;


window.addEventListener("load", () => {
    
    passwordValidation();
    
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
    wrapperNode = document.querySelector("#wrapper");
    imageDiv = document.createElement("div");
    imageDiv.classList.add("annoying-image");
    imageDiv.style.top = Math.random()*innerHeight - 500 + "px";
    imageDiv.style.left = Math.random()*innerWidth - 500 + "px";
    wrapperNode.append(imageDiv);

    setInterval(float, 1000);
}

const float = () => {

    imageDiv.style.top = Math.random()*innerHeight + "px";
    imageDiv.style.left = Math.random()*innerWidth + "px";

    
    //window.requestAnimationFrame(float);
}

const finePrint = () => {
    let finePrint = document.createElement("div");
    finePrint.classList.add("fine-print");
    finePrint.innerText = "Appuyez ici pour réactiver le mot de passe";

    finePrint.style.bottom = "0px";
    finePrint.style.right = "0px";
    wrapperNode.append(finePrint);

    finePrint.onclick = () => {
        finePrint.style.color = "rgb(26, 151, 109)";
        finePrint.style.boxShadow = "5px 10px rgb(26, 151, 109)";
        passwordField.disabled = false;
        submitButton.disabled = false;
        imageDiv.remove();

        //le div fine-print s'enleve pas tout de suite
        setTimeout( () => {
            finePrint.remove();}, 1000);
        
    }

}