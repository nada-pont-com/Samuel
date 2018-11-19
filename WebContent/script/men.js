class menuFase extends Phaser.Scene{
    constructor(){
        super({key:"menu"});
        this.play;
        this.reset;
        this.menu;
    }
    create(){
        this.scene.bringToTop();
        this.play = this.add.image(350,104,"play").setInteractive();
        this.reset = this.add.image(350,144,"reset").setInteractive();
        // let play = this.add.image("start");
        this.menu = this.add.image(350,184,"menu").setInteractive();
        this.input.on("gameobjectdown",function(pointer,gameObject){
            let fase = window.localStorage.getItem("fase");
            switch(gameObject){
                case this.play:
                    this.scene.resume(fase);
                    this.destroy();
                break;
                case this.reset:
                    this.scene.start(fase);
                    this.destroy();
                break;
                case this.menu:
                    this.scene.start("MenuFases");
                    this.destroy();
                break;
            }
        },this);
    }
    update(){
        
    }
    destroy(){
        this.play.destroy();
        this.reset.destroy();
        this.menu.destroy();
    }
}
export default menuFase;