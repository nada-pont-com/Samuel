var posMax = "";
class Menu{
    constructor(scene){
        console.log(scene);
        this.key = scene.sys.config.key;
        this.scene = scene.scene;
        this.add = scene.add;
        this.menu;
        this.input = scene.input;
        this.key = scene.sys.config.key;
        this.create();
    }
    create(){
        this.menu = this.add.image(670,30,'pausa');
        this.menu.setInteractive();
        this.input.on("gameobjectdown",function(pointer,gameObject){
            this.scene.pause(this.key);
            window.localStorage.setItem("fase",this.key);
            this.scene.launch("menu");
        },this);
    }   
    update(player){
        if(this.key == "fase3"){
            posMax = 1050;
        }else{
            posMax = 2450;
        }
        if(player.x>350 && player.x<posMax){
            this.menu.x=parseInt(player.x+320);
        }
    }
}
export default Menu;
