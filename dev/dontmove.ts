/// <reference path="movestrategy.ts" />


class DontMove implements MoveStrategy {

    public waitcounter = 0;

    public zombie:Zombie;

    constructor(z:Zombie) {
        this.zombie = z;
    }
    
    move(): void {
        // wait
        this.waitcounter++;

        if (this.waitcounter > 120) {
            this.zombie.moveStrategy = new MoveToChicken(this.zombie);
        }
    }

}