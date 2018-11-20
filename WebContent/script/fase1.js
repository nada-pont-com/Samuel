import Player from './playerJogo.js';
import Coin from './coin.js';
import PlatForms from "./platForms.js";
import Tempo from "./tempo.js";
import Morcego from "./morcego.js";
import Menu from './menu.js';
class fase1 extends Phaser.Scene{

    constructor(){
        super({key: "fase1"});
        this.score = 0;
        this.gameOver = false;
        this.pontos;
        
    }
    init(){
        this.roundPixels = true;
    }
    preload (){
        this.load.image('bgf1', '../../assets/background/fase 1.png');//700x288
        this.load.image('ground', '../../assets/obj/plataforma.png');//700x60
        this.load.image('plat1','../../assets/obj/dog house.png');//faixada da loja azul
        this.load.image('plat3','../../assets/obj/omega shop.png');//faixada da loja verde
        this.load.image('plat2', '../../assets/obj/plat2.png');//banquinho
        this.load.image('placa', '../../assets/obj/placa_saida.png');//saida
        this.load.image('coin', '../../assets/obj/coin.png');//22x22
        this.load.image('tlaloc', '../../assets/skins/tlaloc.png');//tlaloc
        this.load.spritesheet('dude', '../../assets/skins/skin(1).png', { frameWidth: 31, frameHeight: 36 });//32x48
        this.load.spritesheet('morcego', '../../assets/mobs/morcego.png', { frameWidth: 17, frameHeight: 12 });// 17 x 12 tamanho do frame dp mocego 11 frames
        this.load.image('OBS7','../../assets/obj/OBS7.png');//escada
        this.load.image('limite', '../../assets/obj/limite.png');//limite do mapa
        this.load.image('limite2', '../../assets/obj/limite2.png');//700x2 limite do topo do mapa
    }

    create (){
        this.scene.bringToTop();
        //this.w = this.cameras.main.width;
        //this.h = this.cameras.main.height;

        this.bg = this.add.image(0, 0, 'bgf1').setOrigin(0,0);
        this.bg2 = this.add.image(1400, 0, 'bgf1').setOrigin(0,0);

        this.platforms = new PlatForms(this);
        this.platforms.create('ground');
        this.platforms.criaObstaculos(574, 155, 'plat1',2);
        this.platforms.criaObstaculos(344, 250, 'plat2',2);
        this.platforms.criaObstaculos(1268, 155, 'plat3',2);
        this.platforms.criaObstaculos(1000, 196, 'OBS7',2);
        this.platforms.criaObstaculos(-1, 144 , 'limite',1);
        this.platforms.criaObstaculos(2801, 10, 'limite',1);
        // this.platforms.criaObstaculos(300, 160, 'tlaloc',1);        
        // console.log(this.tempo);

        this.player = new Player(this);
        this.coin = new Coin(this);
        this.coin.geraMoedas(896.5149120000165,15);
        this.coin.geraMoedas(540.7958079999963,25);
        this.coin.geraMoedas(995.6822400000013,160);
        this.coin.geraMoedas(1240.7678079999814,100);
        this.coin.geraMoedas(1940.5149120000165,15);
        this.coin.geraMoedas(2296.7958079999963,25);
        this.coin.geraMoedas(2395.6822400000013,160);
        this.coin.geraMoedas(2751.6822400000013,160);
        this.coin.geraMoedas(2640.7678079999814,100);
        this.coin.geraMoedas(1234.5149120000165,15);
        this.coin.geraMoedas(2800,25);
        this.coin.geraMoedas(193,180);
        this.coin.geraMoedas(322,10);
        this.coin.geraMoedas(444.5149120000165,190);
        this.coin.geraMoedas(777.7958079999963,25);
        this.coin.geraMoedas(369.6822400000013,160);
        this.coin.geraMoedas(246.7678079999814,100);
        this.coin.geraMoedas(1689,250);
        this.coin.geraMoedas(1432.7958079999963,25);
        this.coin.geraMoedas(640,160);
        this.coin.geraMoedas(2000.7678079999814,100);
        this.coin.geraMoedas(2200.7958079999963,25);
        this.coin.criaTexto();
        this.tempo = new Tempo(this);
        this.morcego = new Morcego(this);
        this.morcego.createMorcego(200,25,150);// Parametros: X,Y,Velocidade;
        this.morcego.createMorcego(300,25,120);
        this.morcego.createMorcego(400,25,100);
        this.morcego.createMorcego(1000,25,50);
        this.morcego.createMorcego(555,25,50);
        this.morcego.createMorcego(1200,25,150);
        this.morcego.createMorcego(1450,25,100);
        this.morcego.createMorcego(1500,25,150);
        this.morcego.createMorcego(1745,25,150);
        this.morcego.createMorcego(1950,25,150);
        this.morcego.createMorcego(2000,25,120);
        this.morcego.createMorcego(2300,25,150);
        this.morcego.createMorcego(2470,25,150);
        this.morcego.createMorcego(2520,25,125);
        this.morcego.createMorcego(2600,25,80);
        this.morcego.createMorcego(2650,25,40);

        this.cameras.main.setBounds(0, 0, 2800, 288);
        this.cameras.main.startFollow(this.player.player);
        this.physics.add.overlap(this.player.player, this.coin.coin, this.coin.coletaCoins);
        this.physics.add.overlap(this.player.player, this.morcego.mocego,this.morcego.dano,null,this);
        this.physics.add.collider(this.morcego.mocego, this.platforms.platforms);
        this.menu = new Menu(this);
    }

    update(){
        if (this.gameOver){
            this.tempo.paraTempo();
            this.scene.restart();
            this.gameOver = false;
            return;
        }
        this.player.fimFase(this);
        // this.gameOver = this.menu.update(this.gameOver);
        this.gameOver = this.tempo.update(this.gameOver);
        this.tempo.moveTempo(this.player.player);
        this.coin.update(this.player.player);
        this.player.update(this.coin.coins());
        this.menu.update(this.player.player);
        this.gameOver = this.morcego.update(this.morcego.mocego,this.gameOver);
        this.pontos = this.coin.pontos();
    }
}

export default fase1;
