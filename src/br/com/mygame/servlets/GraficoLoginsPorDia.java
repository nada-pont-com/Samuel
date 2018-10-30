package br.com.mygame.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import br.com.mygame.classes.LoginsPorDia;
import br.com.mygame.conexao.Conexao;
import br.com.mygame.jdbc.JDBCUsuarioDAO;


@WebServlet("/GraficoLoginsPorDia")
public class GraficoLoginsPorDia extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GraficoLoginsPorDia() {
        super();
        // TODO Auto-generated constructor stub
    }
        private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        	
        	System.out.println(1);
        	Conexao conec = new Conexao();
    		Connection conexao = conec.abrirConexao();
    		JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
    		List<LoginsPorDia> logins = jdbcUsuario.buscaLoginsPorDia();
    		String json = new Gson().toJson(logins);
    		System.out.println(json);
    		
        	try {
        		response.setContentType("application/json");
        		response.setCharacterEncoding("UTF-8");
        		response.getWriter().write(json);
        		System.out.println(logins);
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
