let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

export default class Tornado {
    constructor() {
        this.cityNode = document.querySelector(".city");
        this.node = document.createElement("div");
        this.node.classList.add("tornado");
        this.node.style.bottom = windowHeight - Math.random() * 500 + "px";
        this.currentX = 100;
        this.node.style.left = this.currentX + "px";
        this.cityNode.append(this.node);

        this.speed = 5; //vitese varié
        this.size = Math.ceil(Math.random() * 5);
        this.height = 106;
        this.width = 94;
        this.isGettingBigger = true;

    }


    tick() {

        let alive = true;

        if (this.isGettingBigger) {
            this.height += this.size;
            this.width += this.size;
            if (this.height > 250 || this.width > 250) {
                this.isGettingBigger = !this.isGettingBigger;
            }
        }
        else {
            this.height -= this.size;
            this.width -= this.size;
            if (this.height < 106 && this.height > 100) {
                this.isGettingBigger = !this.isGettingBigger;
            }
        }

        if (this.height < 100) {
            alive = false;
            this.node.remove();
        }

        this.node.style.width = this.width + "px";
        this.node.style.height = this.height + "px";

        this.currentX += this.speed;
        this.node.style.left = this.currentX + "px";
        if (this.currentX < 0) {
            alive = false;
            this.node.remove();
        }
        return alive;
    }
}