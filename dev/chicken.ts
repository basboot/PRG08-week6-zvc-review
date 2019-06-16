/// <reference path="gameobject.ts" />

class Chicken extends GameObject {

    public static observers: Zombie[];

    private static instance:Chicken;

    public constructor() {
        super()

        document.body.appendChild(this);

        this.width = 67
        this.height = 110
        this.speedmultiplier = 4

        Chicken.observers = [];

        window.addEventListener("click", (e:MouseEvent) => this.onWindowClick(e))
    }

    public static getInstance():Chicken {
        if (!Chicken.instance) {
            Chicken.instance = new Chicken();
        }

        return Chicken.instance;
    }

    
    public update(){
        this.x += this.xspeed
        this.y += this.yspeed

        this.direction = (this.xspeed < 0) ? 1 : -1;
        this.style.transform = "translate("+this.x+"px, "+this.y+"px) scale("+this.direction+",1)"
    }

    // de beweegrichting aanpassen aan waar in het window is geklikt
    private onWindowClick(e:MouseEvent):void {
        Util.setSpeed(this, e.clientX - this.x, e.clientY - this.y)
    }

    // dit is de update method van de observer
    public sendMessage() {
        for (let o of Chicken.observers) {
            o.notify();
        }
    }
    
    // zet observer op subscription list
    public subscribe(o: Zombie): void {
        Chicken.observers.push(o);
    }

    // verwijder observer van subscription list
    public unsubscribe(o: Zombie): void {
        Chicken.observers.splice(Chicken.observers.indexOf(o), 1);
    }
        

}

window.customElements.define("chicken-component", Chicken)