let movguerreiro = "esq";
let number = 0;
let gameOver;
class Guerreiro{
    constructor(scene){
    gameOver = false;
    this.scene = scene;
    this.guerreiro;
    number = 0;
    this.physics = scene.physics;
    this.anims = scene.anims;
    this.create();
    }
    create(){
        this.guerreiro = this.physics.add.group();
    }
    createGuerreiro(x,y){
        this.guerreiro.create(x, y, 'guerreiro');
        console.log(this.guerreiro);
        this.createAnims(number);
        number++;
    }
    createAnims(number){
        this.anims.create({
            key: 'guerreiro'+number,
            frames: this.anims.generateFrameNumbers('guerreiro', { start: 0, end : 1}),
            frameRate: 6,
            repeat: -1
        });
        console.log(this.guerreiro.children.entries[number]);
        this.guerreiro.children.entries[number].anims.play('guerreiro'+number, true);
    }
    dano(player,guerreiro,scene){
        gameOver = true;
    }
    update(guerreiro,gameOver2){
        if(movguerreiro=="esq"){
            this.guerreiro.setVelocityX(-200);
            if(x < 15){
                movguerreiro="dir";
            }
        }else if(movguerreiro=="dir"){
            this.guerreiro.setVelocityX(200);
            if(x > 2800){
                movguerreiro="esq";
            }
        }
        if(gameOver2){
            return gameOver2;
        }else{
            return gameOver;
        }
    }
}
export default guerreiro;