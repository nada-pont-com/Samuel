package br.com.mygame.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

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
        Map<String, String> msg = new HashMap<String, String>();
		
        try {
        	Message message = new MimeMessage(session);
        	message.setFrom(new InternetAddress("meuemail@gmail.com")); //Remetente
        	Address[] toUser = InternetAddress //Destinatário(s)
        			.parse("quem_deve_receber@email.qualquer.com");  
        	message.setRecipients(Message.RecipientType.TO, toUser);
        	message.setSubject("Recuperar Senha - Samuel em busca do lend�rio skate asteca");//Assunto
        	message.setText("Enviei este email utilizando JavaMail com minha conta GMail!");
        	/**Método para enviar a mensagem criada*/
        	Transport.send(message);
        	System.out.println("Feito!!!");
        	msg.put("msg", "E-mail enviado com sucesso!");
        } catch (MessagingException e) {
        	throw new RuntimeException(e);
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
