class PlatForms{
    constructor(scene){
        this.physics = scene.physics;
        this.platforms;
    }
    create(nome){
        this.platforms = this.physics.add.staticGroup();
        let x = 180;
        for(let i = 0;i<8;i++){
            this.platforms.create(x, 278, nome);
            this.platforms.create(x, 0, "limite2");
            x+=360;
        }
    }
    criaObstaculos(x,y,nome,number){//coordenadas o o nome;
        for(let i = 0;i<number;i++){
            let x2 = 1400*i;
            this.platforms.create(x+x2, y, nome);
        }
    }
}
export default PlatForms;