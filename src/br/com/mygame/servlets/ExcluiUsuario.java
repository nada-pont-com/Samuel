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

import com.google.gson.Gson;

import br.com.mygame.conexao.Conexao;
import br.com.mygame.jdbc.JDBCUsuarioDAO;

/**
* Servlet implementation class ExcluiUsuario
*/
@WebServlet("/ExcluiUsuario")
public class ExcluiUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/**
	* Default constructor. 
	*/
	public ExcluiUsuario() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String login = request.getParameter("login");
		System.out.println(login);
		Conexao conec = new Conexao();
		Connection conexao = conec.abrirConexao();
		JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
		boolean retornoE = jdbcUsuario.deletaEntrada(login);
		String mensagem = "";
		if(retornoE){
			boolean retornoP = jdbcUsuario.deletaPartida(login);
			if(retornoP){
				boolean retornoF = jdbcUsuario.deleta(login);
				if(retornoF){
					mensagem = "Usuário deletado com sucesso.";
				}else{
					mensagem = "Não foi possível deletar o usuario.";
				}
			}else{
				mensagem = "Não foi possível deletar o usuario.";
			}
		}else{
			mensagem = "Não foi possível deletar o usuario.";		
		}
		Map<String, String> msg = new HashMap<String, String>();
		if(mensagem.equals("Não foi possível deletar o usuario.")){
			msg.put("sair", "Samu");
		}
		msg.put("msg", mensagem);
		
		conec.fecharConexao();
		
		String json = new Gson().toJson(msg);
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}    
	
	/**
	* @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	*/
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request, response);
	}
	
	/**
	* @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	*/
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request, response);
	}
	
}
