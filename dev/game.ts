class Game {
    
    public chicken:Chicken
    public gameObjects: GameObject[] = [] 
    public gameOver:boolean = false
 
    constructor() {
        this.chicken = Chicken.getInstance();
  
        for(let c = 0; c<10; c++){
            this.gameObjects.push(new Zombie())
            this.gameObjects.push(new Phone())
        }
 
        this.gameLoop()
    }
    
    private gameLoop(){
        // init
        let phoneToRemove: Phone | null = null;

        // beweging
        this.chicken.update()

        // check collision
        for (let go of this.gameObjects){
            if (go instanceof Chicken) {
                go.update()
            }
            if (go instanceof Zombie) {
                go.update()
            }
            if (go instanceof Phone) {
                go.update()
            }
            if(Util.checkCollision(go, this.chicken)){
                console.log("Een object raakt de chicken!")

                // Zombie = gameover
                if (go instanceof Zombie) {
                    this.gameOver = true;
                }

                // Phone = send message
                if (go instanceof Phone) {
                    this.chicken.sendMessage();
                    phoneToRemove = go;
                }
            }
        }

        // cleanup
        if (phoneToRemove) {
            phoneToRemove.xspeed = 0;
            phoneToRemove.x = -100;
        }

        // loop aanroepen zo lang het geen game over is
        if (!this.gameOver) {
            requestAnimationFrame(() => this.gameLoop())
        }
    }
    
} 

console.log("Start Zombies vs Chicken");
window.addEventListener("load", () => new Game())