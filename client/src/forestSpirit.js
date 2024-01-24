console.log("connected")
let bodyNode;

class ForestSpirit {
    constructor(x,y) {
        console.log("constr")
        bodyNode = document.querySelector("#index");

    this.node = document.createElement("div");
    this.node.classList.add("forest-spirit");

    this.node.style.top = y + "px";
    this.node.style.left = x + "px";
    this.opacity = 1;
    this.disappear = 0.0005;

    bodyNode.append(this.node);
        
    }

    tick(){

        this.opacity -= this.disappear;

        this.node.style.opacity = this.opacity;

        if(this.opacity < 0){
            alive=false;
            this.node.remove();
        }

    }
}