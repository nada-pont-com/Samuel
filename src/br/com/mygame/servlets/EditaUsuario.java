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

import br.com.mygame.classes.Criptografia;
import br.com.mygame.classes.Usuario;
import br.com.mygame.conexao.Conexao;
import br.com.mygame.jdbc.JDBCUsuarioDAO;

@WebServlet("/EditaUsuario")
public class EditaUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	public EditaUsuario() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try{
			System.out.println("ola mundo");
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
			Map<String, String> msg = new HashMap<String, String>();
			HttpSession sessao = request.getSession();
			String login = sessao.getAttribute("login").toString();
			if(login==null){
				msg.put("msg", "Sua sessão provavelmente expirou, ativia novamente para alterar os dados");
			}else{
				Usuario usuariobd = jdbcUsuario.buscarPorLogin(login);
				if (login.equals(usuariobd.getLogin())) {
					System.out.println("senha bd: "+usuariobd.getSenha());

					String senhaAtualCript = Criptografia.criptografaSenha(request.getParameter("pwdsenha"));
					System.out.println("senha dig: "+senhaAtualCript);
					if (senhaAtualCript.equals(usuariobd.getSenha())) {
						Usuario usuario = new Usuario();
						usuario.setLogin(login);
						usuario.setSenha(request.getParameter("pwdnovasenha"));
						if(request.getParameter("hdpermissao").equals("83BC38B441642D71DE2936F5A8D49B38")){
							usuario.setPermissao("0");
						}else{
							usuario.setPermissao("1");
						}
						usuario.setNome(request.getParameter("txtnome"));
						usuario.setNascimento(request.getParameter("txtnascimento"));
						usuario.setEmail(request.getParameter("txtemail"));
						boolean retorno = jdbcUsuario.atualizar(usuario);
						conec.fecharConexao();
						
						if (retorno) {
							msg.put("msg", "Usuário editado!");
						}else {
							msg.put("msg", "Não possível concluir a edição de usuário.");
							msg.put("erro", "true");
						}
					}else {
						msg.put("msg", "Essa senha não corresponde com a senha cadastrada!");
						msg.put("erro", "true");
					}
				}else {
					msg.put("msg", "Você não pode alterar o seu usuário.");
					msg.put("erro", "true");
				}
			}
			conec.fecharConexao();
			
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(new Gson().toJson(msg));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//TODO Auto-generated method stub
		process(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request, response);
	}
}
