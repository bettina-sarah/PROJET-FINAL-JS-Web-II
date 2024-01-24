
let bodyNode;


window.addEventListener("load", () => {
    passwordValidation();
    
})

const passwordValidation = () => {

    document.querySelector("#password-form").onsubmit = () => {
        let success = true;

        if (document.querySelector("#password").value !== "web2") {
            success = false;
            console.log("false")
            document.querySelector("#error-message").style.display = "block";
            annoyingImage();
        }

        //erreur d'identification a cacher...

        return success;
    }
}

const annoyingImage = () => {
    bodyNode = document.querySelector("#index")
    let element = document.createElement("div");
    element.classList.add("annoying-image");

    bodyNode.append(element);

    

}