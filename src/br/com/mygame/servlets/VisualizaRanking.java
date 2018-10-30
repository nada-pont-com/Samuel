package br.com.mygame.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import br.com.mygame.classes.Partidas;

import br.com.mygame.conexao.Conexao;
import br.com.mygame.jdbc.JDBCUsuarioDAO;

/**
 * Servlet implementation class VisualizaRanking
 */
@WebServlet("/VisualizaRanking")
public class VisualizaRanking extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public VisualizaRanking() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	List<Partidas> listPartidas = new ArrayList<Partidas>();
    	
    	Conexao conec = new Conexao();
    	Connection conexao = conec.abrirConexao();
    	JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
    	listPartidas = jdbcUsuario.buscarPorColocacao();
    	conec.fecharConexao();
    	
    	String json = new Gson().toJson(listPartidas);
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

