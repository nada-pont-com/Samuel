/*
 * -------------------------------------------
 * Funções do perfil Visitante
 * -------------------------------------------
 */	

$(document).ready(function(){

	//Função que faz o carregamento das páginas dinamicamente
	carregaPagina = function(){
		var pagename="";
		var data="";
		var url = window.location.search.substring(1);
		if (url==""){
			pagename = "main";
		} else {
			var splitted = url.split("=");
			pagename = splitted[0];
			if (splitted[1]){
				data = splitted[1];
			}
		}
		$("#content").load("pages/visitor/"+pagename+".html", function(response, status, info) {
			if (status == "error") {
				var msg = "Houve um erro ao encontrar a página: "+ info.status + " - " + info.statusText;
				$("#content").html(msg);
			} else {
				carregaDados(pagename);
			}
		});
	}

	//Chama o carregamento da página, fazendo com que a main se abra assim que o site for acessado 
	carregaPagina();

	//Função que chama a Servlet que trata do esquecimento da senha
	RecuperaSenha = function(){
		var email = prompt("Digite seu e-mail para recuperar sua senha:");
		alert(email);
		$.ajax({
			type: "POST",
			url: "RecuperaSenha",
			data:"email="+email,
			success: function (msg) {
				alert(msg.msg);
			},
			error: function (info) {
				alert("Erro ao enviar e-mail: "+ info.status + " - " + info.statusText);		   
			}
		});
	}
	
	login = function(){
		var login = document.frmautenticacao.txtlogin.value;
		var senha = document.frmautenticacao.pwdsenha.value;
		if((login=="")||(senha=="")){
			alert("Preencha todos os campos!");
		} else {
			$.ajax({
				type: "POST",
				url: "Login",
				data: "login="+login+"&senha="+senha,
				success: function (msg) {
					if (msg.msg!=null)
						alert(msg.msg);
					else
						window.location.href = msg.url;
				},
				error: function (info) {
					alert("Erro ao tentar login: "+ info.status + " - " + info.statusText);		   
				}
			});
		}
	}
	
	

	//Função que faz o carregamento dos conteúdos das páginas dinamicamente
	carregaDados = function(pagename){
		switch(pagename){	
			case "ranking":
				visualizaRanking();
			break;
		}
	}
	
	//Função que chama a Servlet de visualização do ranking
	visualizaRanking = function(){
		
		var html = "<table class='ranking'>" +
		"<tr>" +
		"<td>Colocação</td>" +
		"<td>Nome</td>" +
		"<td>Pontuação</td>" +
		"</tr>";
		$.ajax({
			type: "POST",
			url: "VisualizaRanking",
			success: function (dados) {
				
				let tabela = geraTabelaRanking(dados);
				console.log(tabela);
				if(tabela[1]){
					let teste1 = html+tabela[0]+"</table>";
					let teste2 = html+tabela[1]+"</table>";
					let teste3 = html+tabela[2]+"</table>";
					$("#fase1").html(teste1);
					$("#fase2").html(teste2);
					$("#fase3").html(teste3);
					$("#fase2").hide();
					$("#fase3").hide();
				}else{
					html += tabela;
					html += "</table>";
					$("#fase1").html(html);

				}
			},
			error: function(info){
				alert("Erro ao consultar os contatos: "+ info.status + " - " + info.statusText);
			}
			
		})
	}

	geraTabelaRanking = function(listadepontuacoes) {
		var dados = ["","",""];
		console.log(listadepontuacoes);
		if (listadepontuacoes != undefined && listadepontuacoes.length > 0){
			let fase = [];
			let fase1 = [],fase2 = [],fase3 = [];
			let f1 = 0,f2 = 0,f3 = 0;
			for (let i = 0; i < listadepontuacoes.length; i++) {
				if(listadepontuacoes[i].fase=="1"){
					fase1[f1] = listadepontuacoes[i];
					f1++;
				}else if(listadepontuacoes[i].fase=="2"){
					fase2[f2] = listadepontuacoes[i];
					f2++;
				}else if(listadepontuacoes[i].fase=="3"){
					fase3[f3] = listadepontuacoes[i];
					f3++;
				}
			}
			fase[0] = fase1;
			fase[1] = fase2;
			fase[2] = fase3;
			for (var i=0; i<fase.length; i++){
				for(let i2=0; i2<fase[i].length; i2++){
					let list = fase[i];
					dados[i] += "<tr>" +
					"<td>"+(i+1)+"</td>" +
					"<td>"+list[i2].usuarios_login+"</td>" +
					"<td>"+list[i2].pontuacao+"</td>" +
					"</tr>"
				}
				if(fase[i].length==0){
					dados[i] = "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
				}
			}
		} else if (listadepontuacoes == ""){
			dados = "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
		}
		return dados;
	}

	RankMudaFase = function(fase){
		$("#fase1").hide();
		$("#fase2").hide();
		$("#fase3").hide();
		$("#fase"+fase).show();

	}

	cadastro = function(){
		var nome = document.frmcadastro.txtnome.value;
		var nascimento = document.frmcadastro.txtnasci.value;
		var email = document.frmcadastro.txtemail.value;
		var login = document.frmcadastro.txtlogin.value;
		var senha = document.frmcadastro.pwdsenha.value;
		if((login=="")||(senha=="")||(nome=="")||(email=="")||(nascimento=="")){
			alert("Preencha todos os campos");
		}else {
			$.ajax({
				type: "POST",
				url: "InsereUsuario",
				data: $("#cadastroPlayer").serialize(),
				success: function (msg) {
					alert(msg.msg);
				},
				error: function (info) {
					alert("Erro ao cadastrar um novo jogador: "+ info.status + " - " + info.statusText);		   
				}
			});
		}
	}
});
