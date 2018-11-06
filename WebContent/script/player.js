/*
 * -------------------------------------------
 * Funções do perfil Jogador
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
			data: "p=1",
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
	carregaDados = function(pagename){
		switch(pagename){
			case "main":
				$("#username").html(usuarioLogado.login);
			break;
			case "perfil":
				visualizaDados();
				$("#nome").val(usuarioLogado.nome);
				$("#email").val(usuarioLogado.email);
				$("#nascimento").val(usuarioLogado.nascimento);
				$("#login").val(usuarioLogado.login);
				$("#senhaatual").val("");
				$("#novasenha").val("");
				$("#confsenha").val("");
			break;
			case "ranking":
				visualizaRanking();
			break;
		}
	}
	
	//Função que faz o carregamento das páginas dinamicamente
	carregaPagina = function(){
		var pagename = window.location.search.substring(1);
		if (pagename==""){
			pagename = "main";
		}
		$("#content").load(pagename+".html", function(response, status, info) {
			if (status == "error") {
				var msg = "Houve um erro ao encontrar a página: "+ info.status + " - " + info.statusText;
				$("#content").html(msg);
			} else {
				carregaDados(pagename);
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

	geraTabelaDoPerfil = function(){
		var html = "";
		html += "<tr><td>Nome:</td><td>"+usuarioLogado.nome+"</td>" +
        	 "</tr><tr><td>Data de Nascimento:</td><td>"+usuarioLogado.nascimento+"</td></tr>" +
 			 "<tr><td>E-mail:</td><td>"+usuarioLogado.email+"</td></tr>" +
 			 "<tr><td>Login:</td><td>"+usuarioLogado.login+"</td></tr>";
		return html;
	}

	
/*
 * -------------------------------------------
 * Funções específicas do perfil Jogador
 * -------------------------------------------
 */	
	
	editaUsuario = function(){
		var nome = document.frmalterainf.txtnome.value;
		var email = document.frmalterainf.txtemail.value;
		var nascimento = document.frmalterainf.txtnascimento.value;
		var senhaatual = document.frmalterainf.pwdsenha.value;
		var novasenha = document.frmalterainf.pwdnovasenha.value;
		var confsenha = document.frmalterainf.pwdconfsenha.value;
		if((senhaatual=="")||(novasenha=="")||(nome=="")||(email=="")||(nascimento=="")){
			alert("Preencha todos os campos");
		} else if (novasenha!=confsenha){ 
			alert("As senha não batem");
		} else {
			$.ajax({
				type: "POST",
				url: PATH + "EditaUsuario",
				data: $("#cadastroUsuario").serialize(),
				success: function (msg) {
					alert(msg.msg);
					if(!msg.erro)
						verificaUsuario();
				},
				error: function (info) {
					alert("Erro ao alterar seus dados: "+ info.status + " - " + info.statusText);		   
				}
			});
		}
	}
	
	excluiCadastro = function(){
		var confirma = confirm("Certeza? Fica mais um pouquinho...");
		if (confirma){
			$.ajax({
				type: "POST",
				url: PATH + "ExcluiUsuario",
				data: "login="+usuarioLogado.login,
				success: function (msg) {
					alert(msg.msg);
					sair();
				},
				error: function (info) {
					alert("Erro ao excluir seus dados: "+ info.status + " - " + info.statusText);		   
				}
			});
		}
	}

	visualizaDados = function(){
		var html = geraTabelaDoPerfil();
		$("#dadosJoga").html(html);
	}

	deletaConta = function(){
		var login = usuarioLogado.login;
		console.log(login);
		$.ajax({
			type:"POST",
			url: PATH + "ExcluiUsuario",
			data: "login="+login,
			success: function(msg){
				alert(msg.msg);
				if(msg.sair!="Samu"){
					sair();
				}
				verificaUsuario();
			},
			error: function(info){
				alert("Erro ao deletar contato: "+ info.status + " - " + info.statusText);
			}
		});
	};
});
