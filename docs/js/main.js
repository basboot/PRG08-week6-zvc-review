"use strict";
class GameObject extends HTMLElement {
    constructor() {
        super(...arguments);
        this.x = 0;
        this.y = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.speedmultiplier = 1;
        this.direction = 1;
    }
}
class Chicken extends GameObject {
    constructor() {
        super();
        document.body.appendChild(this);
        this.width = 67;
        this.height = 110;
        this.speedmultiplier = 4;
        Chicken.observers = [];
        window.addEventListener("click", (e) => this.onWindowClick(e));
    }
    static getInstance() {
        if (!Chicken.instance) {
            Chicken.instance = new Chicken();
        }
        return Chicken.instance;
    }
    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        this.direction = (this.xspeed < 0) ? 1 : -1;
        this.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.direction + ",1)";
    }
    onWindowClick(e) {
        Util.setSpeed(this, e.clientX - this.x, e.clientY - this.y);
    }
    sendMessage() {
        for (let o of Chicken.observers) {
            o.notify();
        }
    }
    subscribe(o) {
        Chicken.observers.push(o);
    }
    unsubscribe(o) {
        Chicken.observers.splice(Chicken.observers.indexOf(o), 1);
    }
}
window.customElements.define("chicken-component", Chicken);
class DontMove {
    constructor(z) {
        this.waitcounter = 0;
        this.zombie = z;
    }
    move() {
        this.waitcounter++;
        if (this.waitcounter > 120) {
            this.zombie.moveStrategy = new MoveToChicken(this.zombie);
        }
    }
}
class Game {
    constructor() {
        this.gameObjects = [];
        this.gameOver = false;
        this.chicken = Chicken.getInstance();
        for (let c = 0; c < 10; c++) {
            this.gameObjects.push(new Zombie());
            this.gameObjects.push(new Phone());
        }
        this.gameLoop();
    }
    gameLoop() {
        let phoneToRemove = null;
        this.chicken.update();
        for (let go of this.gameObjects) {
            if (go instanceof Chicken) {
                go.update();
            }
            if (go instanceof Zombie) {
                go.update();
            }
            if (go instanceof Phone) {
                go.update();
            }
            if (Util.checkCollision(go, this.chicken)) {
                console.log("Een object raakt de chicken!");
                if (go instanceof Zombie) {
                    this.gameOver = true;
                }
                if (go instanceof Phone) {
                    this.chicken.sendMessage();
                    phoneToRemove = go;
                }
            }
        }
        if (phoneToRemove) {
            phoneToRemove.xspeed = 0;
            phoneToRemove.x = -100;
        }
        if (!this.gameOver) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }
}
console.log("Start Zombies vs Chicken");
window.addEventListener("load", () => new Game());
class MoveToChicken {
    constructor(z) {
        this.zombie = z;
    }
    move() {
        Util.setSpeed(this.zombie, Chicken.getInstance().x - this.zombie.x, Chicken.getInstance().y - this.zombie.y);
        this.zombie.x += this.zombie.xspeed;
        this.zombie.y += this.zombie.yspeed;
    }
}
class Phone extends GameObject {
    constructor() {
        super();
        document.body.appendChild(this);
        this.width = 50;
        this.height = 92;
        this.x = Math.random() * (window.innerWidth - 50);
        this.y = Math.random() * (window.innerHeight - 220);
        this.update();
    }
    update() {
        this.direction = (this.xspeed < 0) ? 1 : -1;
        this.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.direction + ",1)";
    }
}
window.customElements.define("phone-component", Phone);
class Util {
    static setSpeed(go, xdist, ydist) {
        let distance = Math.sqrt(xdist * xdist + ydist * ydist);
        go.xspeed = xdist / distance;
        go.yspeed = ydist / distance;
        go.xspeed *= go.speedmultiplier;
        go.yspeed *= go.speedmultiplier;
    }
    static checkCollision(go1, go2) {
        return (go1.x < go2.x + go2.width &&
            go1.x + go1.width > go2.x &&
            go1.y < go2.y + go2.height &&
            go1.height + go1.y > go2.y);
    }
    static removeFromGame(go, arr) {
        go.div.remove();
        let i = arr.indexOf(go);
        if (i != -1) {
            arr.splice(i, 1);
        }
    }
}
class Zombie extends GameObject {
    constructor() {
        super();
        this.messages = 0;
        document.body.appendChild(this);
        this.width = 67;
        this.height = 119;
        this.x = Math.random() * (window.innerWidth - 67);
        this.y = Math.random() * (window.innerHeight / 2) + (window.innerHeight / 2 - 67);
        this.speedmultiplier = Math.random() * 2;
        Chicken.getInstance().subscribe(this);
        this.moveStrategy = new MoveToChicken(this);
    }
    update() {
        this.moveStrategy.move();
        this.direction = (this.xspeed < 0) ? 1 : -1;
        this.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.direction + ",1)";
    }
    notify() {
        console.log("Zombie got a message");
        this.moveStrategy = new DontMove(this);
        this.messages++;
        if (this.messages > 4) {
            Chicken.getInstance().unsubscribe(this);
        }
    }
}
window.customElements.define("zombie-component", Zombie);
//# sourceMappingURL=main.js.map