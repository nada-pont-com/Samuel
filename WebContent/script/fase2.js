import Player from './playerJogo.js';
import Coin from './coin.js';
import Tempo from "./tempo.js";
import PlatForms from "./platForms.js";
import Cobra from "./cobra.js";
import Menu from './menu.js';
class fase2 extends Phaser.Scene{

    constructor(){
        super({key: "fase2"});
        this.bat;
        this.bg;
        this.platforms;
        this.pontos = 0;
        this.obs;
        this.cursors;
        this.score = 0;
        this.gameOver = false;
        this.scoreText;
        this.coin;
        this.player;
        this.w;
        this.h;
    }
    init(){

        this.roundPixels = true;

    }
    preload (){
        this.load.image('bgf2', 'assets/background/fase 2.png');//700x288
        this.load.image('ground', 'assets/obj/plataforma.png');//700x60
        this.load.image('coin', 'assets/obj/coin.png');//22x22
        this.load.spritesheet('dude', 'assets/skins/dude.png', { frameWidth: 31, frameHeight: 36 });//32x48
        this.load.spritesheet('cobra', 'assets/mobs/cobra.png', {frameWidth: 36, frameHeight: 36});//32x48
        this.load.image('OBS7','assets/obj/OBS7.png');//escada
        this.load.image('limite', 'assets/obj/limite.png');//limite do mapa
    }

    create (){
        this.scene.bringToTop();
        //this.w = this.cameras.main.width;
        //this.h = this.cameras.main.height;
        this.bg = this.add.image(0, 0, 'bgf2').setOrigin(0,0);
        this.bg2 = this.add.image(1400, 0, 'bgf2').setOrigin(0,0);

        this.platforms = new PlatForms(this);
        this.platforms.create("ground");
        this.platforms.criaObstaculos(-1, 144 , 'limite',1);
        this.platforms.criaObstaculos(2801, 10, 'limite',1);

        this.player = new Player(this);
        this.coin = new Coin(this);
        //primeira
        this.coin.geraMoedas(200,250);
        this.coin.geraMoedas(230,250);
        //segunda
        this.coin.geraMoedas(300,250);
        this.coin.geraMoedas(330,250);
        this.coin.geraMoedas(300,215);
        this.coin.geraMoedas(330,215);
        //terceira
        this.coin.geraMoedas(400,180);
        this.coin.geraMoedas(430,180);
        this.coin.geraMoedas(400,215);
        this.coin.geraMoedas(430,215);
        this.coin.geraMoedas(400,250);
        this.coin.geraMoedas(430,250);
        //quarta
        this.coin.geraMoedas(500,145);
        this.coin.geraMoedas(530,145);
        this.coin.geraMoedas(500,180);
        this.coin.geraMoedas(530,180);
        this.coin.geraMoedas(500,215);
        this.coin.geraMoedas(530,215);
        this.coin.geraMoedas(500,250);
        this.coin.geraMoedas(530,250);
        //quinta
        this.coin.geraMoedas(600,180);
        this.coin.geraMoedas(630,180);
        this.coin.geraMoedas(600,215);
        this.coin.geraMoedas(630,215);
        this.coin.geraMoedas(600,250);
        this.coin.geraMoedas(630,250);
        //sexta
        this.coin.geraMoedas(700,215);
        this.coin.geraMoedas(730,215);
        this.coin.geraMoedas(700,250);
        this.coin.geraMoedas(730,250);
        //setima
        this.coin.geraMoedas(800,250);
        this.coin.geraMoedas(830,250);

        //primeira
        this.coin.geraMoedas(1200,250);
        this.coin.geraMoedas(1230,250);
        //segunda
        this.coin.geraMoedas(1300,250);
        this.coin.geraMoedas(1330,250);
        this.coin.geraMoedas(1300,215);
        this.coin.geraMoedas(1330,215);
        //terceira
        this.coin.geraMoedas(1400,180);
        this.coin.geraMoedas(1430,180);
        this.coin.geraMoedas(1400,215);
        this.coin.geraMoedas(1430,215);
        this.coin.geraMoedas(1400,250);
        this.coin.geraMoedas(1430,250);
        //quarta
        this.coin.geraMoedas(1500,145);
        this.coin.geraMoedas(1530,145);
        this.coin.geraMoedas(1500,180);
        this.coin.geraMoedas(1530,180);
        this.coin.geraMoedas(1500,215);
        this.coin.geraMoedas(1530,215);
        this.coin.geraMoedas(1500,250);
        this.coin.geraMoedas(1530,250);
        //quinta
        this.coin.geraMoedas(1600,180);
        this.coin.geraMoedas(1630,180);
        this.coin.geraMoedas(1600,215);
        this.coin.geraMoedas(1630,215);
        this.coin.geraMoedas(1600,250);
        this.coin.geraMoedas(1630,250);
        //sexta
        this.coin.geraMoedas(1700,215);
        this.coin.geraMoedas(1730,215);
        this.coin.geraMoedas(1700,250);
        this.coin.geraMoedas(1730,250);
        //setima
        this.coin.geraMoedas(1800,250);
        this.coin.geraMoedas(1830,250);
        //oitava
        this.coin.geraMoedas(2100,250);
        this.coin.geraMoedas(2130,250);
        //nona
        this.coin.geraMoedas(2200,250);
        this.coin.geraMoedas(2230,250);
        this.coin.geraMoedas(2200,215);
        this.coin.geraMoedas(2230,215);
        //decima
        this.coin.geraMoedas(2300,180);
        this.coin.geraMoedas(2330,180);
        this.coin.geraMoedas(2300,215);
        this.coin.geraMoedas(2330,215);
        this.coin.geraMoedas(2300,250);
        this.coin.geraMoedas(2330,250);
        //decima primeira
        this.coin.geraMoedas(2400,145);
        this.coin.geraMoedas(2430,145);
        this.coin.geraMoedas(2400,180);
        this.coin.geraMoedas(2430,180);
        this.coin.geraMoedas(2400,215);
        this.coin.geraMoedas(2430,215);
        this.coin.geraMoedas(2400,250);
        this.coin.geraMoedas(2430,250);
        //decima segunda
        this.coin.geraMoedas(2500,180);
        this.coin.geraMoedas(2530,180);
        this.coin.geraMoedas(2500,215);
        this.coin.geraMoedas(2530,215);
        this.coin.geraMoedas(2500,250);
        this.coin.geraMoedas(2530,250);
        //decima terceira
        this.coin.geraMoedas(2600,215);
        this.coin.geraMoedas(2630,215);
        this.coin.geraMoedas(2600,250);
        this.coin.geraMoedas(2630,250);
        //decima quarta
        this.coin.geraMoedas(2700,250);
        this.coin.geraMoedas(2730,250);

        //fim moedas
        this.cobra = new Cobra(this);
        this.cobra.createCobra(260,205);
        this.cobra.createCobra(460,205);
        this.cobra.createCobra(660,205);
        this.cobra.createCobra(860,205);
        this.cobra.createCobra(1460,205);
        this.cobra.createCobra(1660,205);
        this.cobra.createCobra(1860,205);
        this.cobra.createCobra(2260,205);
        this.cobra.createCobra(2460,205);
        this.cobra.createCobra(2660,205);
        this.coin.criaTexto();
        this.tempo = new Tempo(this);
        this.menu = new Menu(this);
        this.cameras.main.setBounds(0, 0, 2800, 288);        
        this.physics.add.collider(this.cobra.cobra, this.platforms.platforms);
        this.cameras.main.startFollow(this.player.player);
        this.physics.add.overlap(this.player.player, this.coin.coin, this.coin.coletaCoins);
        // this.physics.add.overlap(this.player.player, this.cobra.cobra,this.cobra.dano,null,this);
        this.physics.add.overlap(this.cobra.cobra, this.player.player,this.cobra.dano);
    }

    update(){
        if (this.gameOver){
            this.tempo.paraTempo();
            this.scene.restart();
            this.gameOver = false;
            return;
        }
        this.player.fimFase(this);
        this.gameOver = this.tempo.update(this.gameOver);
        this.gameOver = this.cobra.update(this.cobra.cobra,this.gameOver);
        this.tempo.moveTempo(this.player.player);
        this.coin.update(this.player.player);
        this.player.update(this.coin.coins());
    }
}

export default fase2;
