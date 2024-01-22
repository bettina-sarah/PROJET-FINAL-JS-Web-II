window.addEventListener("load", () => {
    document.querySelector("#password-form").onsubmit = () => {
        let success = true;

        if (document.querySelector("#password").value !== "web2") {
            success = false;
            document.querySelector("#error-message").style.display = "block";
        }

        //erreur d'identification a cacher...

        return success;
    }
})