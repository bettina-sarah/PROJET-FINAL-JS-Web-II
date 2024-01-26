let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

export default class Rain {
    constructor() {
        this.cityNode = document.querySelector(".city");
        this.node = document.createElement("div");
        this.node.classList.add("rain");
        this.node.style.top = this.cityNode.getBoundingClientRect().y - 200 + "px";
        this.currentY = this.cityNode.getBoundingClientRect().y;
        this.currentX = windowWidth * Math.random();
        this.node.style.left = this.currentX + "px";
        this.cityNode.append(this.node);

        this.speed = Math.ceil(Math.random() * 5); //vitese varié
        this.left = 2;
        this.incrementor = 2;

    }


    tick() {

        let alive = true;
        this.currentY += this.speed;

        this.incrementor++;
        if (this.incrementor > 30) {
            this.currentX -= this.left;
            this.incrementor--;
        }
        else {
            this.currentX += this.left;
        }

        this.node.style.left = this.currentX;
        this.node.style.top = this.currentY + "px";
        if (this.currentY > windowHeight) {
            alive = false;
            this.node.remove();
        }
        return alive;
    }
}