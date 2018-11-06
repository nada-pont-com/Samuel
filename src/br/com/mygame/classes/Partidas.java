package br.com.mygame.classes;

import java.io.Serializable;


public class Partidas implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String moedas;
	private String s_tempo;
	private String pontuacao;
	private String fase;
	private String usuarios_login;
	public String getid() {
		return id;
	}
	public void setid(String id) {
		this.id = id;
	}
	public String getmoedas() {
		return moedas;
	}
	public void setmoedas(String moedas) {
		this.moedas = moedas;
	}
	public String gets_tempo() {
		return s_tempo;
	}
	public void sets_tempo(String s_tempo) {
		this.s_tempo = s_tempo;
	}
	public String getpontuacao() {
		return pontuacao;
	}
	public void setpontuacao (String pontuacao) {
		this.pontuacao = pontuacao;
	}
	public String getfase() {
		return fase;
	}
	public void setfase(String fase) {
		this.fase = fase;
	}
	public String getusuario_login() {
		return usuarios_login;
	}
	public void setusuarios_login(String usuarios_login) {
		this.usuarios_login = usuarios_login;
	}
	
	

	

}
