import Player from './playerJogo.js';
import Coin from './coin.js';
import PlatForms from "./platForms.js";
import Tempo from "./tempo.js";
import boss from './boss.js';
import Menu from './menu.js';
class fase3 extends Phaser.Scene{
     constructor(){
        super({key: "fase3"});
        this.score = 0;
        this.gameOver = false;
        this.pontos = 0;
    }
    init(){
        this.roundPixels = true;
    }
    preload (){
        this.load.image('bgf3', '../../assets/background/fase 3.png');//700x288
        this.load.image('ground', '../../assets/obj/plataforma.png');//700x60
        this.load.image('tronco','../../assets/obj/tronco2.png');//tronco        
        this.load.image('coin', '../../assets/obj/coin.png');//22x22
        this.load.spritesheet('dude', '../../assets/skins/dude.png', { frameWidth: 31, frameHeight: 36 });//32x48
        this.load.spritesheet('boss', '../../assets/mobs/tlaloc.png', {frameWidth: 174, frameHeight: 232});
        this.load.image('OBS7','../../assets/obj/OBS7.png');//escada
        this.load.image('limite', '../../assets/obj/limite.png');//limite do mapa
    }
     create (){
        this.scene.bringToTop();
        //this.w = this.cameras.main.width;
        //this.h = this.cameras.main.height;
         this.bg = this.add.image(0, 0, 'bgf3').setOrigin(0,0);
        this.bg2 = this.add.image(1400, 0, 'bgf3').setOrigin(0,0);
         this.platforms = new PlatForms(this);
         this.platforms.create('ground');
        this.platforms.criaObstaculos(574, 200, 'tronco',1);
        this.platforms.criaObstaculos(1074, 200, 'tronco',1);
        this.platforms.criaObstaculos(-1, 144 , 'limite',1);
        this.platforms.criaObstaculos(1401, 144, 'limite',1);
        
        // console.log(this.tempo);
         this.player = new Player(this);
        this.coin = new Coin(this);
        this.coin.geraMoedas(200,250);
        this.coin.geraMoedas(230,250);
        this.coin.geraMoedas(260,250);
        this.coin.geraMoedas(290,250);
        this.coin.geraMoedas(320,250);
        this.coin.geraMoedas(350,250);
        this.coin.geraMoedas(380,250);
        this.coin.geraMoedas(410,210);
        this.coin.geraMoedas(440,180);
        this.coin.geraMoedas(470,180);
        this.coin.geraMoedas(500,180);
        this.coin.geraMoedas(530,180);
        this.coin.geraMoedas(560,180);
        this.coin.geraMoedas(590,180);
        
        this.boss = new boss(this);
        this.boss.createBoss(750,144);
        this.coin.criaTexto();
        this.tempo = new Tempo(this);
        this.menu = new Menu(this);
        this.cameras.main.setBounds(0, 0, 1400, 288);        
        this.physics.add.collider(this.boss.boss, this.platforms.platforms);
        this.cameras.main.setBounds(0, 0, 1400, 288);
        this.cameras.main.startFollow(this.player.player);
        this.physics.add.overlap(this.player.player, this.coin.coin, this.coin.coletaCoins);
        this.physics.add.collider(this.boss.boss, this.player.player,this.boss.dano,null,this);
    }
     update(){
        if (this.gameOver){
            this.tempo.paraTempo();
            this.scene.restart();
            this.gameOver = false;
            return;
        }
        this.gameOver = this.tempo.update();
        this.gameOver = this.boss.update(this.boss.boss,this.gameOver);
        this.tempo.moveTempo(this.player.player);
        this.coin.update(this.player.player);
        this.player.update(this.coin.coins());
        this.menu.update(this.player.player);
        
    }
}
 export default fase3;