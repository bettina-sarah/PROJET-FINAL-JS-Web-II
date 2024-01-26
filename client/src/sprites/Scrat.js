//let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

export default class Scrat {
    constructor() {
        this.cityNode = document.querySelector(".city");
        this.node = document.createElement("div");
        this.node.classList.add("scrat");
        this.node.style.bottom = windowHeight - 500 + "px";
        this.currentX = 100;
        this.node.style.left = this.currentX + "px";
        this.cityNode.append(this.node);

        this.speed = 5;
        this.standingRight = true;
        this.standingLeft = false;
        this.goingLeft = false;
        this.goingRight = false;
        this.sniff = false;

        this.spriteType = "scrat";
        this.findAcorn = false;
        this.grabAcorn = false;

        // tous les event listener aurait pu etre regroupé dans des fonctions, manque de temps
        
        document.addEventListener("keydown", (e) => { //deplacer right
            if (e.key == "ArrowRight") {
                this.goingRight = true;
                this.goingLeft = false;
                this.standingRight = false;
                this.standingLeft = false;
                console.log("press right");
                console.log(this.goingRight)
            }
        });
        document.addEventListener("keyup", (e) => { //inspecter right
            if (e.key == "ArrowRight") {
                this.goingRight = false;
                this.goingLeft = false;
                this.standingRight = true;
                this.standingLeft = false;
            }
        });

        document.addEventListener("keydown", (e) => { //deplacer left
            if (e.key == "ArrowLeft") {
                this.goingRight = false;
                this.goingLeft = true;
                this.standingRight = false;
                this.standingLeft = false;
            }
        });
        document.addEventListener("keyup", (e) => { //inspecter left
            if (e.key == "ArrowLeft") {
                this.goingRight = false;
                this.goingLeft = false;
                this.standingRight = false;
                this.standingLeft = true;
            }
        });

        document.addEventListener("keydown", (e) => { //inspecter left
            if (e.key == "ArrowDown") {
                this.goingRight = false;
                this.goingLeft = false;
                this.standingRight = false;
                this.standingLeft = false;
                this.sniff = true;
            }
        });
        document.addEventListener("keyup", (e) => { //inspecter left
            if (e.key == "ArrowDown") {
                this.goingRight = false;
                this.goingLeft = false;
                this.standingRight = true;
                this.standingLeft = false;
                this.sniff = false;
            }
        });

        
    }


    tick() {

        let alive = true;

        if (this.goingRight) {
            let url = "url('./img/sprites-seasons/scrat/scrat-walk-right.gif')";
            this.node.style.backgroundImage = url;
            this.currentX += this.speed;
        }
        if (this.standingRight) {
            let url = "url('./img/sprites-seasons/scrat/scrat-inspect-right.gif')";
            this.node.style.backgroundImage = url;
        }

        if (this.goingLeft) {
            let url = "url('./img/sprites-seasons/scrat/scrat-walk-left.gif')";
            this.node.style.backgroundImage = url;
            this.currentX -= this.speed;
        }

        if(this.standingLeft) {
            let url = "url('./img/sprites-seasons/scrat/scrat-inspect-left.gif')";
            this.node.style.backgroundImage = url;
        }

        if(this.sniff){
            let url = "url('./img/sprites-seasons/scrat/scrat-sniff-right.gif')";
            this.node.style.backgroundImage = url;
        }

        if(this.findAcorn){
            let url = "url('./img/sprites-seasons/scrat/scrat-findacorn.gif')";
            this.node.style.backgroundImage = url;
        }

        if(this.grabAcorn){
            let url = "url('./img/sprites-seasons/scrat/happy-scrat.gif')";
            this.node.style.backgroundImage = url;
        }

       

        this.node.style.left = this.currentX + "px";
        if (this.currentX < 0) {
            alive = false;
            this.node.remove();
        }
        return alive;
    }

}