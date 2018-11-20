import MenuFases from "./menufases.js";

class MainMenu extends Phaser.Scene {
    constructor() {
        super({key: "MainMenu"});
        this.menuNumber=-1;
    }

    preload() {
        this.load.image('play', '../../assets/buttons/play.png');
        this.load.image('pausa', '../../assets/buttons/pausa.png');
        this.load.image('reset', '../../assets/buttons/reset.png');
        this.load.image('start', '../../assets/buttons/start.png');
        this.load.image('menu', '../../assets/buttons/menu.png');
        this.load.image('cancela', '../../assets/buttons/cancela.png');
        this.load.image("button", "../../assets/buttons/start.png");
        this.load.image("bgmm", "../../assets/background/menufases.png");
        this.load.image('limite', '../../assets/obj/limite.png');//limite do mapa
        this.load.image('limite2', '../../assets/obj/limite2.png');//limite do mapa
    }

    create() {
        var bg = this.add.image(350, 144, "bgmm");
        var start = this.add.image(350, 144, "button").setScale(4).setInteractive();
        start.on('pointerdown', function(){
            this.scene.start('MenuFases');
        }, this);
    }
}
export default MainMenu;
