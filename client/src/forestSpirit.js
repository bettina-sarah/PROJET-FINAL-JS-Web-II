console.log("connected")
let bodyNode;

class ForestSpirit {
    constructor(x,y) {
    bodyNode = document.querySelector("#index");

    this.node = document.createElement("div");
    this.node.classList.add("forest-spirit");

    this.node.style.top = y + "px";
    this.node.style.left = x + "px";
    this.opacity = Math.random()*0.9;
    this.node.style.opacity = this.opacity;
    this.disappear = 0.0005;

    bodyNode.append(this.node);
    }

    tick(){
        let alive=true;
        this.opacity -= this.disappear;
        console.log(this.opacity)

        this.node.style.opacity = this.opacity;

        if(this.opacity<0){
            this.node.remove();
            alive=false;
        }

        return alive;
    }
}