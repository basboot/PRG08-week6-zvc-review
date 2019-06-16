/// <reference path="gameobject.ts" />

class Zombie extends GameObject {

    public messages:number = 0;

    public moveStrategy: MoveStrategy;

    constructor() {
        super(); 

        document.body.appendChild(this);

        this.width = 67
        this.height = 119
        this.x = Math.random() * (window.innerWidth - 67)
        this.y = Math.random() * (window.innerHeight/2) + (window.innerHeight/2-67)
        this.speedmultiplier = Math.random() * 2

        Chicken.getInstance().subscribe(this);

        this.moveStrategy = new MoveToChicken(this);
    }

    public update(){
        this.moveStrategy.move();

            this.direction = (this.xspeed < 0) ? 1 : -1;
            this.style.transform = "translate("+this.x+"px, "+this.y+"px) scale("+this.direction+",1)"
        }
    public notify(): void {
        console.log("Zombie got a message");

        this.moveStrategy = new DontMove(this);

        this.messages++;

        if (this.messages > 4) {
            Chicken.getInstance().unsubscribe(this);
        }
    }

}

window.customElements.define("zombie-component", Zombie)