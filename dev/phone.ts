/// <reference path="gameobject.ts" />


class Phone extends GameObject {
        
    constructor() {
        super()

        document.body.appendChild(this)
        
        this.width = 50
        this.height = 92
        this.x = Math.random() * (window.innerWidth - 50)
        this.y = Math.random() * (window.innerHeight - 220)

        this.update()
    }

    public update():void {
        this.direction = (this.xspeed < 0) ? 1 : -1;
        this.style.transform = "translate("+this.x+"px, "+this.y+"px) scale("+this.direction+",1)"
    }

}

window.customElements.define("phone-component", Phone)