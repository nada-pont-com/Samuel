class EndGame extends Phaser.Scene{
    constructor(){
        super({key:"EndGame"})
    }
    update(){
        this.load.image('Preto', '../../assets/background/fundo.png');
    }
    create(){
        this.scene.bringToTop();
        this.add.image(0,0,"Preto").setOrigin(0,0);
        let texto = this.add.text(350,144,"Fim de Jogo",{fill:"#fff",fontSize:"40px",fontFamily:"Arial"});
        texto.setOriginDisplay(texto.width/2,texto.height/2);
        start.on('pointerdown', function(){
            this.scene.start('MenuFases');
        }, this);
    }
}
export default EndGame;