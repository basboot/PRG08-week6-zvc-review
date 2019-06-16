class MoveToChicken implements MoveStrategy {
    public zombie:Zombie;

    constructor(z:Zombie) {
        this.zombie = z;
    }


    public move(): void {
        // deze regel code geeft de zombie de snelheid waarmee hij naar de kip beweegt
        Util.setSpeed(this.zombie, Chicken.getInstance().x - this.zombie.x, Chicken.getInstance().y - this.zombie.y)

        // nu passen we de x en y positie aan met de snelheid
        this.zombie.x += this.zombie.xspeed
        this.zombie.y += this.zombie.yspeed
    }

}