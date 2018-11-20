package br.com.mygame.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.mygame.classes.Usuario;
import br.com.mygame.conexao.Conexao;
import br.com.mygame.jdbc.JDBCUsuarioDAO;

import com.google.gson.Gson;

import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
* Servlet implementation class RecuperaSenha
*/
@WebServlet("/RecuperaSenha")
public class RecuperaSenha extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/**
	* @see HttpServlet#HttpServlet()
	*/
	public RecuperaSenha() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Conexao conec = new Conexao();
		Connection conexao = conec.abrirConexao();
		JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
		String email = request.getParameter("email").toString();
		String login = jdbcUsuario.buscarPorEmail(email);
		Map<String, String> msg = new HashMap<String, String>();
		String senha = jdbcUsuario.geraSenha();
		System.out.println("Login: "+login);
		if (!(login.equals(""))) {
			Usuario usuario = new Usuario();
			usuario.setSenha(senha);
			usuario.setLogin(login);
			
		
			Properties props = new Properties();
			/** Parâmetros de conexão com servidor Gmail */
			props.put("mail.smtp.host", "smtp.gmail.com");
			props.put("mail.smtp.socketFactory.port", "587");
			props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.port", "587");
			props.put("mail.smtp.starttls.enable", "true");
			
			Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication("samuelskateasteca@gmail.com", "54MU3LR054");
				}
			});
			/** Ativa Debug para sessão */
			session.setDebug(true);
			System.out.println(email);
			System.out.println("senha rec: "+senha);
			try {
				Message message = new MimeMessage(session);
				message.setFrom(new InternetAddress("samuelskateasteca@gmail.com")); //Remetente
				Address[] toUser = InternetAddress.parse(email);  
				message.setRecipients(Message.RecipientType.TO, toUser);
				message.setSubject("Recuperar Senha - Samuel em busca do lendário skate asteca");//Assunto
				message.setText("Você resetou sua senha do site Samuel em busca do lendário skate asteca, a sua senha atual: '"+usuario.getSenha()+"'. Recomendamos á todos os usuários para que mudem suas senhas assim que haverem perdido as mesmas, por questões de segurança. \n Atenciosamente, Guardiões do Skate Asteca");
				/**M�todo para enviar a mensagem criada*/
				Transport.send(message);
				System.out.println("Feito!!!");
				msg.put("msg", "E-mail enviado com sucesso!");
				boolean retorno = jdbcUsuario.atualizarSenha(usuario);
				conec.fecharConexao();
				
				if (retorno) {
					msg.put("msg", "Senha alterada, um email com a nova senha ser� enviado para "+email+"\n\nCaso tenha problemas entre em contato conosco atravez do email samuelskateasteca@gmail.com");
				}else {
					msg.put("msg", "Não possével concluir a edição de usuário.");
					msg.put("erro", "true");
				}
			} catch (MessagingException e) {
				throw new RuntimeException(e);
			}
		}else {
			msg.put("msg", "E-mail Não existe no banco de dados");
		}
		
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
