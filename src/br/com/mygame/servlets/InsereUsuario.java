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

import br.com.mygame.classes.Usuario;
import br.com.mygame.conexao.Conexao;
import br.com.mygame.jdbc.JDBCUsuarioDAO;

import com.google.gson.Gson;
/**
 * Servlet implementation class InsereUsuario
 */
@WebServlet("/InsereUsuario")
public class InsereUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public InsereUsuario() {
        // TODO Auto-generated constructor stub
    }

    private void process(HttpServletRequest request, HttpServletResponse response) 
    		throws ServletException, IOException {
    	
    	Usuario usuario = new Usuario();
    	
    	try {
    		usuario.setNome(request.getParameter("txtnome"));
    		usuario.setEmail(request.getParameter("txtemail"));
    		usuario.setNascimento(request.getParameter("txtnasci"));
    		usuario.setLogin(request.getParameter("txtlogin"));
    		usuario.setSenha(request.getParameter("pwdsenha"));
    		usuario.setPermissao(request.getParameter("hdpermissao"));
    		System.out.println(request.getParameter("txtnome"));
    		Conexao conec = new Conexao();
    		Connection conexao = conec.abrirConexao();
    		JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
    		Usuario usuariobd = jdbcUsuario.buscarPorLogin(usuario.getLogin());
    		Map<String, String> msg = new HashMap<String, String>();
    		if (usuario.getLogin().equals(usuariobd.getLogin())) {
    			msg.put("msg", "Esse login j� existe.");
    		} else {	
	    		boolean retorno = jdbcUsuario.inserir(usuario);
	    		if (retorno) {
	    			msg.put("msg", "Usu�rio cadastrado com sucesso.");
	    		} else {
	    			msg.put("msg", "N�o foi poss�vel cadastrar o usu�rio.");
	    		}
    		}	
    		conec.fecharConexao();
	    	System.out.println(msg);
    		String json = new Gson().toJson(msg);
    		
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
