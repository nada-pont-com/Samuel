package br.com.mygame.servlets;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import br.com.mygame.classes.Usuario;
import br.com.mygame.conexao.Conexao;
import br.com.mygame.jdbc.JDBCUsuarioDAO;

/**
 * Servlet implementation class ConsultaUsuarioPorLogin
 */
@WebServlet("/ConsultaUsuarioPorLogin")
public class ConsultaUsuarioPorLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public ConsultaUsuarioPorLogin() {
        super();
        // TODO Auto-generated constructor stub
    }

    private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	Usuario usuario = new Usuario();
    	
    	Conexao conec = new Conexao();
    	Connection conexao = conec.abrirConexao();
    	JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
    	usuario = jdbcUsuario.buscarPorLogin(request.getParameter("login"));
    	conec.fecharConexao();
    	
    	String json = new Gson().toJson(usuario);
    	try {
    		response.setContentType("application/json");
    		response.setCharacterEncoding("UTF-8");
    		response.getWriter().write(json);
    	} catch (IOException e) {
    		e.printStackTrace();
    	}
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
