let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

export default class Acorn {
    constructor() {
        this.cityNode = document.querySelector(".city");
        this.node = document.createElement("div");
        this.node.classList.add("acorn");
        this.node.style.bottom = windowHeight - 500 + "px";
        this.currentX = windowWidth - 400;
        this.node.style.left = this.currentX + "px";
        this.cityNode.append(this.node);

        this.spriteType = "acorn";
        this.width = 100;

        this.isFound = false;
        
    }


    tick() {

        let alive = true;

        if (this.isFound) {
            alive = false;
            this.node.remove();
        }
        return alive;
    }

}