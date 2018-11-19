class Pontos{
    constructor(scene){
        this.scene = scene;
        this.pontos = scene.pontos;
        this.seg = scene.tempo.seg;
        this.min = scene.tempo.min;
        this.tempo;
    }
    salvar(){
        
        $.ajax({
            type:"POST",
            url: "Salvar",
            data:"Pontuacao="+pontos+"",
            success:function(msg){

            }
        })
    }
}
export default Pontos;