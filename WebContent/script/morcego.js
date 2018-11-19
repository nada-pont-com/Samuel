// 19 x 14 tamanho do frame dp mocego
let nunber = 0;
let gameOver;
class Morcego{
    constructor(scene){
        gameOver = false;
        this.scene = scene;
        this.player = scene.player.player;
        this.mocego;
        nunber = 0;
        this.physics = scene.physics;
        this.anims = scene.anims;
        this.create();
    }
    create(){
        this.mocego = this.physics.add.group();
    }
    createMorcego(x,y,veloc){
        this.mocego.create(x, y, 'morcego');
        /*if(y<15){
            SDMob[nunber] = "desce";
        }else{
            SDMob[nunber] = "subi";
        } */
        // console.log(this.mocego);
        this.createAnims(nunber,veloc);
        nunber++;
    }
    createAnims(nunber,veloc){
        this.anims.create({
            key: 'morcego'+nunber,
            frames: this.anims.generateFrameNumbers('morcego', { start: 0, end : 10}),
            frameRate: 10,
            repeat: -1
        });
        this.mocego.children.entries[nunber].setVelocityY(veloc);
        this.mocego.children.entries[nunber].setBounce(0, 1);
        this.mocego.children.entries[nunber].anims.play('morcego'+nunber, true);
    }
    dano(){
        gameOver = true;
    }
    update(mocego,gameOver2){
        /* let i2 = mocego.children.entries;
        // console.log(SDMob);
        for (let i = 0; i < i2.length; i++) {
            i2[i].setVelocityX(0);
            let y = i2[i].y;
            if(SDMob[i]=="subi"){
                i2[i].setVelocityY(-100);
                if(y < 15){
                    console.log(y);
                    SDMob[i]="desce";
                }
                // console.log(this.mocego.y);
            }else if(SDMob[i]=="desce"){
                i2[i].setVelocityY(100);
                // console.log(y);
                if(y > 269){
                    console.log(y);
                    SDMob[i]="subi";
                }
            }
        }
        */
        if(gameOver2){
            return gameOver2;
        }else{
            return gameOver;
        } 
    }
}

export default Morcego;