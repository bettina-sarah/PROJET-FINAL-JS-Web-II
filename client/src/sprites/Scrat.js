//let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

export default class Scrat {
    constructor() {
        this.cityNode = document.querySelector(".city");
        this.node = document.createElement("div");
        this.node.classList.add("scrat");
        this.node.classList.add("sniff-right");
        this.node.style.bottom = windowHeight - 500 + "px";
        this.currentX = 100;
        this.node.style.left = this.currentX + "px";
        this.cityNode.append(this.node);

        this.speed = 5;
        this.standingRight = true;
        this.standingLeft = false;
        this.goingLeft = false;
        this.goingRight = false;

        this.spriteType = "scrat";

        // tous les event listener aurait pu etre regroupé dans des fonctions, manque de temps
        document.addEventListener("keydown", (e) => { //deplacer right
            if (e.key == "ArrowRight") {
                this.goingRight = true;
                this.goingLeft = false;
                this.standingRight = false;
                this.standingLeft = false;
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
            if (e.key == "ArrowRight") {
                this.goingRight = false;
                this.goingLeft = true;
                this.standingRight = false;
                this.standingLeft = false;
            }
        });
        document.addEventListener("keyup", (e) => { //inspecter left
            if (e.key == "ArrowRight") {
                this.goingRight = false;
                this.goingLeft = false;
                this.standingRight = false;
                this.standingLeft = true;
            }
        });
    }


    tick() {

        let alive = true;

        if (this.goingRight) {
            this.node.classList.remove()
            this.currentX += this.speed;
        }


        this.node.style.left = this.currentX + "px";
        if (this.currentX < 0) {
            alive = false;
            this.node.remove();
        }
        return alive;
    }

}