// 36 x 36 tamanho do frame da cobra
let number = 0;
let gameOver;
let movcobra = [];
class Cobra{
    constructor(scene){
        gameOver = false;
        this.scene = scene;
        this.cobra;
        this.distancia = {x:[],x2:[]};
        number = 0;
        this.physics = scene.physics;
        this.anims = scene.anims;
        this.create();
    }
    create(){
        this.cobra = this.physics.add.group();
    }
    createCobra(x,y,direcao){
        this.cobra.create(x, y, 'cobra');
        if(direcao=="esq"){
            movcobra[number]  = "esq";
            this.distancia.x[number] = x - 100
            this.distancia.x2[number] = x;
        }else{
            movcobra[number]  = "dir";
            this.distancia.x[number] = x;
            this.distancia.x2[number] = x + 100;
        }
        // console.log(this.cobra);
        this.createAnims(number);
        number++;
    }
    createAnims(number){
        this.anims.create({
            key: 'cobra'+number,
            frames: this.anims.generateFrameNumbers('cobra', { start: 0, end : 1}),
            frameRate: 6,
            repeat: -1
        });
        // console.log(this.cobra.children.entries[number]);
        this.cobra.children.entries[number].setBounce(2,0);
        this.cobra.children.entries[number].anims.play('cobra'+number, true);
    }
    dano(player,cobra,scene){
        gameOver = true;
    }
    update(cobra,gameOver2){
        let cobras = cobra.children.entries;
        for (let i = 0; i < cobras.length; i++) {            
            let x = cobras[i].x;
            if(movcobra[i]=="esq"){
                cobras[i].setVelocityX(-20);
                if(x < this.distancia.x[i]){
                    movcobra[i]="dir";
                }
            }else if(movcobra[i]=="dir"){
                cobras[i].setVelocityX(20);
                if(x > this.distancia.x2[i]){
                    movcobra[i]="esq";
                }
            }
        }
        if(gameOver2){
            return gameOver2;
        }else{
            return gameOver;
        }
    }
}

export default Cobra;