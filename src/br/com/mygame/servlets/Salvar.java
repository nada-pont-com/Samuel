package br.com.mygame.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import br.com.mygame.classes.Partidas;
import br.com.mygame.classes.Usuario;
import br.com.mygame.conexao.Conexao;
import br.com.mygame.jdbc.JDBCUsuarioDAO;

/**
* Servlet implementation class Salvar
*/
@WebServlet("/Salvar")
public class Salvar extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/**
	* @see HttpServlet#HttpServlet()
	*/
	public Salvar() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	private void process(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		System.out.println("salvando pontuacao");
		
		Partidas partida = new Partidas();
		
		try {
			String fase = request.getParameter("fase");
			partida.setfase(fase);
			partida.setid("");
			partida.setmoedas("");
			partida.setpontuacao(request.getParameter("pontuacao"));
			partida.sets_tempo(request.getParameter("tempo"));
			
			HttpSession sessao = request.getSession();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao); 
			String login = sessao.getAttribute("login").toString();
			Map<String, String> msg = new HashMap<String, String>();
			if(!login.equals("")){
				Partidas partida2 = new Partidas();
				boolean retorno = true;
				partida2 = jdbcUsuario.buscarPartidas(login,fase);
				Usuario usuario = jdbcUsuario.buscarPorLogin(login);
				if(partida2==null){
					retorno = jdbcUsuario.inserePartida(partida,usuario);
				}else{
					int pontBd = Integer.parseInt(partida2.getpontuacao());
					int pont = Integer.parseInt(partida.getpontuacao());
					if(pont>pontBd){
						retorno = jdbcUsuario.atualizaPartida(partida,usuario);
					}
				}
				conec.fecharConexao();
				if(!retorno){
					msg.put("msg", "Erro ao salvar pontuacao");
				}else{
					msg.put("msg", "Pontuação salva com sucesso!");
				}
			}
			String json = new Gson().toJson(msg);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(json);
		}catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	* @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	*/
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request,response);
	}
	
	/**
	* @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	*/
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request,response);
	}
	
}
