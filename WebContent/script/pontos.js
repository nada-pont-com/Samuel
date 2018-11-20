class Pontos{
    constructor(scene){
        this.scene = scene;
        this.pontos = scene.pontos;
        this.seg = scene.tempo.seg;
        this.min = scene.tempo.min;
        this.tempo;
        this.key = scene.sys.config.key;
        this.salvar();
    }
    salvar(){
        let fase = this.key.split("fase");
        let tempo = this.seg+(this.min*60);
        console.log("pontuacao="+this.pontos+"fase="+fase[1]+"tempo="+tempo);
        $.ajax({
            type:"POST",
            url: "../../Salvar",
            data:"pontuacao="+this.pontos+"&fase="+fase[1]+"&tempo="+tempo,
            success:function(msg){
                console.log(msg);
            }
        })
    }
}
export default Pontos;