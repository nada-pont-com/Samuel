/*
 * -------------------------------------------
 * Funções do perfil Administrador
 * -------------------------------------------
 */	

$(document).ready(function(){
	//Objeto que guardará o usuário logado assim que soubermos quem ele é
	var usuarioLogado;
	//Variável com base do caminho, ajudará na chamada das Servlets
	var PATH = "../../";
	
	//Função que chama a Servlet que trata da validação da sessão do usuário
	verificaUsuario = function(){
		$.ajax({
			type: "POST",
			url: PATH + "ValidaSessao",
			data: "p=0",
			success: function (usuario) {
				if (usuario.login!=null){
					usuarioLogado = new Object();
					usuarioLogado.login = usuario.login;
					usuarioLogado.email = usuario.email;
					usuarioLogado.nome = usuario.nome;
					usuarioLogado.nascimento = usuario.nascimento;
					carregaPagina();
				} else {
					sair();
				}	
			},
			error: function (info) {
				sair();
			}
		});
	}
	//Chama a função assim que a página for carregada
	verificaUsuario();
	

	
	//Função que faz o carregamento dos conteúdos das páginas dinamicamente
	carregaDados = function(pagename, data){
		switch(pagename){
			case "main":
				$("#username").html(usuarioLogado.login);
			break;
			case "graficos": 
				geraDadosFaixaEtaria();
				geraDadosLoginsPorDia();
			break;	
			case "ranking":
				visualizaRanking();
			break;
			case "perfil":
				visualizaDados();
		}
	}
	
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
		$("#content").load(pagename+".html", function(response, status, info) {
			if (status == "error") {
				var msg = "Houve um erro ao encontrar a página: "+ info.status + " - " + info.statusText;
				$("#content").html(msg);
			} else {
				carregaDados(pagename, data);
			}
		});
	}


	//Função que chama a Servlet que trata da finalização da sessão do usuário
	sair = function(){
		$.ajax({
			type: "POST",
			url: PATH + "Logout",
			success: function (data) {
				window.location.href = (PATH+"index.html");	
			},
			error: function (info) {
				alert("Erro ao tentar encerrar sua sessão: "+ info.status + " - " + info.statusText);	
			}
		});
	}

	
/*
 * -------------------------------------------
 * Funções específicas do perfil Administrador
 * -------------------------------------------
 */	

	//Função que chama a Servlet que trata do cadastro do usuário Administrador
	cadastraAdministrador = function(){
		
		var nome = document.frmcadastroA.txtnome.value;
		var nascimento = document.frmcadastroA.txtnasci.value;
		var email = document.frmcadastroA.txtemail.value;
		var login = document.frmcadastroA.txtlogin.value;
		var senha = document.frmcadastroA.pwdsenha.value;
		if((login=="")||(senha=="")||(nome=="")||(email=="")||(nascimento=="")){
			alert("Preencha todos os campos!");
		} else {
			console.log($("#cadastroAdmin").serialize());
			$.ajax({
				type: "POST",
				url: PATH + "InsereUsuario",
				data: $("#cadastroAdmin").serialize(),
				success: function (msg) {
					alert(msg.msg);
					carregaDados("admincrud");
				},
				error: function (info) {
					alert("Erro ao cadastrar um novo administrador: "+ info.status + " - " + info.statusText);		   
				}
			});
		}
	}
	
	//Função que chama a Servlet que trata da busca dos usuários registrados, conforme filtro
	exibeAdministradores = function(){
		var valorBusca = $("#busca").val();
		var html = "<table>" +
				"<tr>" +
				"<th>Nome</th>" +
				"<th>Login</th>" +
				"<th>E-mail</th>" +
				"<th>Nascimento</th>" +
				"<th>Ações</th>" +
				"</tr>";
		
		$.ajax({
			type: "POST",
			url: PATH + "ConsultaUsuarios",
			data: "permissao=0&valorBusca="+valorBusca,
			success: function(dados){
				html += geraTabelaAdministradores(dados);
				html += "</table>";
				$("#listaAdministradores").html(html);
			},
			error: function(info){
				alert("Erro ao consultar os contatos: "+ info.status + " - " + info.statusText);
			}
		});
		
	};

	dadosAdmLogado = function() {
		var dados = "";
		dados += "<table class=\"perfil\"><tr><td>Nome:</td><td>"+usuarioLogado.nome+"</td>" +
        	 "</tr><tr><td>Data de Nascimento:</td><td>"+usuarioLogado.nascimento+"</td></tr>" +
 			 "<tr><td>E-mail:</td><td>"+usuarioLogado.email+"</td></tr>" +
 			 "<tr><td>Login:</td><td>"+usuarioLogado.login+"</td></tr></table>";
		return dados;
		
 }

	//Função que gera o HTML interno da tabela de administradores registrados
	geraTabelaAdministradores = function(listaDeAdmins) {
		var dados = "";
		if (listaDeAdmins != undefined && listaDeAdmins.length > 0){
			for (var i=0; i<listaDeAdmins.length; i++){
				dados += "<tr>" +
						"<td>"+listaDeAdmins[i].nome+"</td>" +
						"<td>"+listaDeAdmins[i].login+"</td>" +
						"<td>"+listaDeAdmins[i].email+"</td>" +
						"<td>"+listaDeAdmins[i].nascimento+"</td>" +
						"<td>" +
							"<a href=\"?adminedit="+listaDeAdmins[i].login+"\">Editar</a> " +
							"<a onclick=\"deletaAdministrador('"+listaDeAdmins[i].login+"')\">Deletar</a>" +
						"</td>" +
						"</tr>"
			}
		} else if (listaDeAdmins == ""){
			dados += "<tr><td colspan='5'>Nenhum registro encontrado</td></tr>";
		}
		return dados;
	}
	
	//Função que chama a Servlet que trata da exclusão do cadastro do usuário Administrador selecionado
	deletaAdministrador = function(login){
		$.ajax({
			type:"POST",
			url: PATH + "ExcluiUsuario",
			data: "login="+login,
			success: function(msg){
				alert(msg.msg);
				carregaDados("admincrud");
			},
			error: function(info){
				alert("Erro ao deletar contato: "+ info.status + " - " + info.statusText);
			}
		});
	};
	
	//Função que chama a Servlet que trata da busca do cadastro do usuário Administrador selecionado
	buscaAdministrador = function(login){
		$.ajax({
			type: "POST",
			url: PATH + "ConsultaUsuarioPorLogin",
			data: "login="+login,
			success: function(contato){
				$("#nome").val(contato.nome);
				$("#email").val(contato.email);
				$("#nascimento").val(contato.nascimento);
				$("#login").val(contato.login);
				$("#senhaatual").val("");
				$("#novasenha").val("");
				$("#confsenha").val("");
			},
			error: function(rest){
				alert("Erro ao encontrar o usuário a ser alterado.");
			}
		});
		
	};
	
	//Função que chama a Servlet que trata da alteração do cadastro do usuário Administrador selecionado
	editaUsuario = function(){
		var nome = document.frmalterainf.txtnome.value;
		var email = document.frmalterainf.txtemail.value;
		var nascimento = document.frmalterainf.txtnascimento.value;
		//var login = document.frmalterainf.txtlogin.value; Não existe na tabela do alterar
		var senhaatual = document.frmalterainf.pwdsenha.value;
		var novasenha = document.frmalterainf.pwdnovasenha.value;
		var confsenha = document.frmalterainf.pwdconfsenha.value;
		if((senhaatual=="")||(novasenha=="")||(nome=="")||(email=="")||(nascimento=="")){
			alert("Você deixou um campo vazio!");
		} else if (novasenha!=confsenha){ 
			alert("Nova senha não é igual a do confirmar senha ,Repita a sua senha corretamente!");
		} else {
			console.log($("#edicaoUsuario").serialize());
			$.ajax({
				type: "POST",
				url: PATH + "EditaUsuario",
				data: $("#edicaoUsuario").serialize(),
				success: function (msg) {
					alert(msg.msg);
					if(!msg.erro)
						carregaPagina();
				},
				error: function (info) {
					alert("Erro ao alterar os dados: "+ info.status + " - " + info.statusText);		   
				}
			});
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
			url: PATH + "VisualizaRanking",
			success: function (dados) {
				
				html += geraTabelaRanking(dados);
				html += "</table>";
				$(".overflow").html(html);
			},
			error: function(info){
				alert("Erro ao consultar os contatos: "+ info.status + " - " + info.statusText);
			}
			
		})
	}

	geraTabelaRanking = function(listadepontuacoes) {
		var dados = "";
		if (listadepontuacoes != undefined && listadepontuacoes.length > 0){
			for (var i=0; i<listadepontuacoes.length; i++){
				dados += "<tr>" +
						"<td>"+(i+1)+"</td>" +
						"<td>"+listadepontuacoes[i].usuarios_login+"</td>" +
						"<td>"+listadepontuacoes[i].pontuacao+"</td>" +
						"</tr>"
			}
		} else if (listadepontuacoes == ""){
			dados += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
		}
		return dados;
	}
	
	geraDadosFaixaEtaria = function(){
		
		$.ajax({
			type: "POST",
			url: PATH + "GraficoFaixaEtaria",
			success: function (dados) {
				criaGraficoFaixaEtaria(dados);
			},
			error: function (info) {
				alert("Erro ao gerar gráfico faixa etária: "+ info.status + " - " + info.statusText);		   
			}
	  });
	}
	  
	criaGraficoFaixaEtaria = function(listaDeJogadores){

	 var zeroAnove = listaDeJogadores[0].quantidade;
	 var dezAquinze = listaDeJogadores[1].quantidade;
	 var dezseisAvinte = listaDeJogadores[2].quantidade;
	 var vinteumAtrinta = listaDeJogadores[3].quantidade;
	 var tresumAtrescinco = listaDeJogadores[4].quantidade;
	 var tresseisAquarenta = listaDeJogadores[5].quantidade;
	 var quatroumAcincocinco = listaDeJogadores[6].quantidade;
	 var maiorcincocinco = listaDeJogadores[7].quantidade;
	 var ctx = document.getElementById("GraficoFaixaEtaria");
 	var myChart = new Chart(ctx, {
 		type: 'bar',
 		data: {
 			labels :[listaDeJogadores[0].faixa, listaDeJogadores[1].faixa, listaDeJogadores[2].faixa, listaDeJogadores[3].faixa, listaDeJogadores[4].faixa, listaDeJogadores[5].faixa, listaDeJogadores[6].faixa, listaDeJogadores[7].faixa],
 			datasets: [{
 				label : 'Gráfico de Idades' ,
 				data: [zeroAnove, dezAquinze, dezseisAvinte, vinteumAtrinta, tresumAtrescinco, tresseisAquarenta, quatroumAcincocinco, maiorcincocinco],
 				backgroundColor :[
 					'rgba(225, 99, 132, 0.2,)',
 					'rgba(54, 162, 235, 0.2)',
 					'rgba(255 206, 86, 0.2)',
 					'rgba(75, 192, 192, 0.2)',
 					'rgba(153, 102, 255, 0.2)',
 					'rgba(255, 159, 64, 0.2)',
 					'rgba(255, 162, 86, 0.2',
 					'rgba(138, 192, 123, 0.2)'
 				],
 				borderColor :[
 		        	'rgba(225, 99, 132, 1)',
 		        	'rgba(54, 162, 235, 1)',
 		        	'rgba(255, 206, 86, 1)',
 		        	'rgba(75, 192, 192, 1)',
 		        	'rgba(153, 102, 255, 1)',
 		        	'rgba(255, 159, 64, 1)',
 		        	'rgba(255, 162, 86, 1)',
 					'rgba(153, 99, 235, 1)'
 		        ],
 		        borderWidth : 1
 			}]
 		},
 	    options:{ 
 	    	scales:{
 	    		yAxes: [{
 	    			tickes:{
 	    				beginAtZero : true
 	    			}
 	    		}]
 	    	}
 	    }
 	    	
 	});
 	}
	
	validaAlterar = function(){

	}



	geraDadosLoginsPorDia = function(){
		$.ajax({
			type: "POST",
			url: PATH + "GraficoLoginsPorDia",
			success: function (dados) {
				criaGraficoLoginsPorDia(dados);
			},
			error: function (info) {
				alert("Erro ao gerar gráfico logins por dia: "+ info.status + " - " + info.statusText);		   
			}
	  });
	}
	
	criaGraficoLoginsPorDia = function(dados){
		var valores = [];
		console.log(dados);
		for (var int = 0; int < 30; int++) {
			for (var int2 = 0; int2 < dados.length; int2++) {
				if(dados[int2].dia==int+1){
					valores[int] = dados[int2].quantidade;
					break;
				}else{
					valores[int] = 0;
				}
			}
		}
		var ctx = document.getElementById("GraficoLoginsPorDia");
	    var myLineChart = new Chart(ctx, {
	       type: 'line',
	       data: {
	    	   labels : ["1", "2", "3", "4" , "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23","24","25","26","27","28","29","30","31"],
	       datasets: [{ 
				label : 'Gráfico de Logins' ,
				data :valores,
		        borderWidth : 6,
		        borderColor:'rgba(77,166,253,0,85)',
		        backgroundColor: 'transparent',
			}]
	      }, 
	   });
	}

	visualizaDados= function(dados){
		/*$.ajax({
			type: "POST",
			url: PATH + "VisualizaDados",
			success: function (dados) {*/
				
				var html = dadosAdmLogado(dados);
				html += "</table>";
				$(".overflow").html(html);
			/*},
			error: function(info){
				alert("Erro ao consultar os contatos: "+ info.status + " - " + info.statusText);
			}
			
		})
			 */
	}

	
});