import fase1 from "./fase1.js";
import fase2 from "./fase2.js";
import fase3 from "./fase3.js";

class MenuFases extends Phaser.Scene {
    constructor(){
        super({key: "MenuFases"});
    }

    preload(){
        this.load.image("f1", "../assets/buttons/f1.png");
        this.load.image("f2", "../assets/buttons/f2.png");
        this.load.image("f3", "../assets/buttons/f3.png");
        this.load.image("bgmf", "../assets/background/menufases.png");
    }
    create(){
        var bg = this.add.image(350, 144, "bgmf");
        var f1 = this.add.image(113, 144, "f1").setInteractive();
        f1.on('pointerdown', function(){
            this.scene.start('fase1');
        }, this);
        var f2 = this.add.image(339, 144, "f2").setInteractive();
        f2.on('pointerdown', function(){
            this.scene.start('fase2');
        }, this);
        var f3 = this.add.image(552, 144, "f3").setInteractive();
        f3.on('pointerdown', function(){
          this.scene.start('fase3');
        }, this);
        // var f4 = this.add.image(0, 144, "f4").setInteractive();
        // var f5 = this.add.image(0, 144, "f5").setInteractive();
        // var f6 = this.add.image(0, 144, "f6").setInteractive();
    }
}
export default MenuFases;
