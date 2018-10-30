package br.com.mygame.classes;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Usuario implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String nome;
	private String nascimento;
	private String email;
	private String login;
	private String senha;
	private String permissao;
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getNascimento() {
		return nascimento;
	}
	public void setNascimento(String nascimento) {
		this.nascimento = nascimento;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin (String login) {
		this.login = login;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getPermissao() {
		return permissao;
	}
	public void setPermissao(String permissao) {
		this.permissao = permissao;
	}
	
	public String converteNascimentoParaBD(String nascimento) {
		String[] nascimentoDividido = nascimento.split("/");
		String nascimentoConvertido = nascimentoDividido[2] + "-" + nascimentoDividido[1] + "-" + nascimentoDividido[0];
		return nascimentoConvertido;
	}
	
	public String converteNascimentoParaFrontend(String nascimento) {
		String[] nascimentoDividido = nascimento.split("-");
		String nascimentoConvertido = nascimentoDividido[2] + "/" + nascimentoDividido[1] + "/" + nascimentoDividido[0];
		return nascimentoConvertido;
	}
	
	public String dataAtual(){
		String dataAtual = "";
		DateFormat data = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		dataAtual = data.format(date).toString();
		return dataAtual;
		
	}
	

}
