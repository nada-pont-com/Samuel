package br.com.mygame.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import br.com.mygame.classes.Criptografia;
import br.com.mygame.classes.FaixaEtaria;
import br.com.mygame.classes.LoginsPorDia;
import br.com.mygame.classes.Partidas;
import br.com.mygame.classes.Usuario;
import br.com.mygame.jdbcinterfaces.UsuarioDAO;

public class JDBCUsuarioDAO implements UsuarioDAO {
	
	private Connection conexao;
	
	public JDBCUsuarioDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public boolean inserir(Usuario login) {
		
		String comando = "INSERT INTO usuarios (login, senha, permissao, nome, nascimento, email, data_cadastro) VALUES (?,?,?,?,?,?,?)";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(1, login.getLogin());
			p.setString(2, Criptografia.criptografaSenha(login.getSenha()));
			p.setString(3, login.getPermissao());
			p.setString(4, login.getNome());
			p.setString(5, login.converteNascimentoParaBD(login.getNascimento()));
			p.setString(6, login.getEmail());
			p.setString(7, login.dataAtual());
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	
	public Usuario buscarPorLogin(String login) {
		String comando = "SELECT * FROM usuarios WHERE login = '" + login + "'";
		Usuario usuario = new Usuario();
		try {
			java.sql.Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				String nome = rs.getString("nome");
				String nascimento = usuario.converteNascimentoParaFrontend(rs.getString("nascimento"));
				String email = rs.getString("email");
				String senha = rs.getString("senha");
				String permissao = rs.getString("permissao");
				
				usuario.setLogin(login);
				usuario.setSenha(senha);
				usuario.setPermissao(permissao);
				usuario.setNome(nome);
				usuario.setNascimento(nascimento);
				usuario.setEmail(email);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return usuario;
	}
	
	public boolean atualizar(Usuario usuario) {
		
		String comando = "UPDATE usuarios SET senha=?, nome=?, nascimento=?, email=?";
		comando += " WHERE login=?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(1, Criptografia.criptografaSenha(usuario.getSenha()));
			p.setString(2, usuario.getNome());
			p.setString(3, usuario.converteNascimentoParaBD(usuario.getNascimento()));
			p.setString(4, usuario.getEmail());
			p.setString(5, usuario.getLogin());
			p.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public boolean deletar(String usuario) {
		String comando = "DELETE FROM usuarios WHERE usuario = '" + usuario +"'";
		Statement p;
		try {
			p = this.conexao.createStatement();
			p.execute(comando);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public List<Usuario> buscar(String login) {
		String comando = "SELECT * FROM usuarios";
		System.out.println(comando);
		List<Usuario> listUsuario = new ArrayList<Usuario>();
		Usuario usuario = null;
		try {
			Statement stmt = conexao.createStatement(); 
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				usuario = new Usuario();
				String loginbd = rs.getString("usuario");
				String nome = rs.getString("nome");
				String nascimento = usuario.converteNascimentoParaFrontend(rs.getString("nascimento"));
				String email = rs.getString("email");
				String senha = rs.getString("senha");
				String permissao = rs.getString("permissao");
				
				usuario.setLogin(loginbd);
				usuario.setSenha(senha);
				usuario.setPermissao(permissao);
				usuario.setNome(nome);
				usuario.setNascimento(nascimento);
				usuario.setEmail(email);
				
				listUsuario.add(usuario);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listUsuario;
	}
	
	
	public List<Partidas> buscarPorColocacao() {
		String comando = "SELECT * FROM `partidas` ORDER BY `pontuacao` DESC";
		
		Partidas partidas = null;
		List<Partidas> listPartidas = new ArrayList<Partidas>();
		try {
			java.sql.Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				partidas = new Partidas();
				String id = rs.getString("id");
				String moedas = rs.getString("moedas");
				String s_tempo = rs.getString("s_tempo");
				String pontuacao = rs.getString("pontuacao");
				String fase = rs.getString("fase");
				String usuarios_login = rs.getString("usuarios_login");
				
				partidas.setid(id);
				partidas.setmoedas(moedas);
				partidas.sets_tempo(s_tempo);
				partidas.setpontuacao(pontuacao);
				partidas.setfase(fase);
				partidas.setusuarios_login(usuarios_login);
				
				listPartidas.add(partidas);
			}
		}catch(SQLException e){
			e.printStackTrace();
		}
		
		return listPartidas;
	}
	
	public List<FaixaEtaria> buscaJogadoresPorFaixaEtaria(){
		//prepara��o
		Date hoje = Calendar.getInstance().getTime();
		System.out.println(hoje);
		
		SimpleDateFormat formataDiaMes = new SimpleDateFormat("-MM-dd");
		String diaMesAtual = formataDiaMes.format(hoje);
		System.out.println(diaMesAtual);
		
		SimpleDateFormat formataAno = new SimpleDateFormat("yyyy");
		int anoAtual = Integer.parseInt(formataAno.format(hoje));
		System.out.println(anoAtual);
		
		List <FaixaEtaria> listaDeJogadores = new ArrayList<FaixaEtaria>();
		//fim prepara��o
		
		//inicio primeira faixa etaria
		FaixaEtaria zeroAnove = new FaixaEtaria();
		zeroAnove.setFaixa("0 a 9");
		
		int anoInicial = anoAtual-9;
		String dataInicial = anoInicial+diaMesAtual;
		int anoFinal = anoAtual;
		String dataFinal = anoFinal+diaMesAtual;
		System.out.println(dataFinal);
		
		String comando = "SELECT COUNT(login) as quantidade FROM usuarios WHERE permissao = 1 AND nascimento BETWEEN '"+dataInicial+"' AND '"+dataFinal+"'"; 
		System.out.println(comando);
		try {
			java.sql.Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				zeroAnove.setQuantidade(rs.getInt("quantidade"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		listaDeJogadores.add(zeroAnove);
		//fim primeira faixa etaria
		
		
		//FaixaEtaria dezAquinze = new FaixaEtaria();
		FaixaEtaria dezAquinze = new FaixaEtaria();
		dezAquinze.setFaixa("10 a 15");
		
		anoInicial = anoAtual-15;
		dataInicial = anoInicial+diaMesAtual;
		anoFinal = anoAtual-10;
		dataFinal = anoFinal+diaMesAtual;
		
		comando = "SELECT COUNT(login) as quantidade FROM usuarios WHERE permissao = 1 AND nascimento BETWEEN '"+dataInicial+"' AND '"+dataFinal+"'"; 
		System.out.println(comando);
		try {
			java.sql.Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				dezAquinze.setQuantidade(rs.getInt("quantidade"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		listaDeJogadores.add(dezAquinze);
		
		//*FaixaEtaria dezseisAvinte = new FaixaEtaria();
		FaixaEtaria dezseisAvinte = new FaixaEtaria();
		dezseisAvinte.setFaixa("16 a 20");
		
		anoInicial = anoAtual-20;
		dataInicial = anoInicial+diaMesAtual;
		anoFinal = anoAtual-16;
		dataFinal = anoFinal+diaMesAtual;
		
		comando = "SELECT COUNT(login) as quantidade FROM usuarios WHERE permissao = 1 AND nascimento BETWEEN '"+dataInicial+"' AND '"+dataFinal+"'"; 
		System.out.println(comando);
		try {
			java.sql.Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				dezseisAvinte.setQuantidade(rs.getInt("quantidade"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		listaDeJogadores.add(dezseisAvinte); 
		
		//FaixaEtaria vinteumAtrinta = new FaixaEtaria();
		FaixaEtaria vinteumAtrinta = new FaixaEtaria();
		vinteumAtrinta.setFaixa("21 a 30");
		
		anoInicial = anoAtual-30;
		dataInicial = anoInicial+diaMesAtual;
		anoFinal = anoAtual-21;
		dataFinal = anoFinal+diaMesAtual;
		
		comando = "SELECT COUNT(login) as quantidade FROM usuarios WHERE permissao = 1 AND nascimento BETWEEN '"+dataInicial+"' AND '"+dataFinal+"'"; 
		System.out.println(comando);
		try {
			java.sql.Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				vinteumAtrinta.setQuantidade(rs.getInt("quantidade"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		listaDeJogadores.add(vinteumAtrinta);
		
		//FaixaEtaria tresumAtrescinco = new FaixaEtaria();
		FaixaEtaria tresumAtrescinco = new FaixaEtaria();
		tresumAtrescinco.setFaixa("31 a 35");
		
		anoInicial = anoAtual-35;
		dataInicial = anoInicial+diaMesAtual;
		anoFinal = anoAtual-31;
		dataFinal = anoFinal+diaMesAtual;
		
		comando = "SELECT COUNT(login) as quantidade FROM usuarios WHERE permissao = 1 AND nascimento BETWEEN '"+dataInicial+"' AND '"+dataFinal+"'"; 
		System.out.println(comando);
		try {
			java.sql.Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				tresumAtrescinco.setQuantidade(rs.getInt("quantidade"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		listaDeJogadores.add(tresumAtrescinco);
		
		//FaixaEtaria tresseisAquarenta = new FaixaEtaria();
		FaixaEtaria  tresseisAquarenta= new FaixaEtaria();
		tresseisAquarenta.setFaixa("36 a 40");
		
		anoInicial = anoAtual-40;
		dataInicial = anoInicial+diaMesAtual;
		anoFinal = anoAtual-36;
		dataFinal = anoFinal+diaMesAtual;
		
		comando = "SELECT COUNT(login) as quantidade FROM usuarios WHERE permissao = 1 AND nascimento BETWEEN '"+dataInicial+"' AND '"+dataFinal+"'"; 
		System.out.println(comando);
		try {
			java.sql.Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				tresseisAquarenta.setQuantidade(rs.getInt("quantidade"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		listaDeJogadores.add(tresseisAquarenta);
		
		//FaixaEtaria quatroumAcincocinco = new FaixaEtaria();
		FaixaEtaria  quatroumAcincocinco= new FaixaEtaria();
		quatroumAcincocinco.setFaixa("41 a 55");
		
		anoInicial = anoAtual-55;
		dataInicial = anoInicial+diaMesAtual;
		anoFinal = anoAtual-41;
		dataFinal = anoFinal+diaMesAtual;
		
		comando = "SELECT COUNT(login) as quantidade FROM usuarios WHERE permissao = 1 AND nascimento BETWEEN '"+dataInicial+"' AND '"+dataFinal+"'"; 
		System.out.println(comando);
		try {
			java.sql.Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				quatroumAcincocinco.setQuantidade(rs.getInt("quantidade"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		listaDeJogadores.add(quatroumAcincocinco);
		
		
		//FaixaEtaria maiorcincocinco = new FaixaEtaria();
		FaixaEtaria  maiorcincocinco= new FaixaEtaria();
		maiorcincocinco.setFaixa("maior que 55");
		
		anoInicial = anoAtual;
		dataInicial = "0001-01-01";
		anoFinal = anoAtual-56;
		dataFinal = anoFinal+diaMesAtual;
		
		comando = "SELECT COUNT(login) as quantidade FROM usuarios WHERE permissao = 1 AND nascimento BETWEEN '"+dataInicial+"' AND '"+dataFinal+"'"; 
		System.out.println(comando);
		try {
			java.sql.Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				maiorcincocinco.setQuantidade(rs.getInt("quantidade"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}      
		
		listaDeJogadores.add(maiorcincocinco);
		return listaDeJogadores;
		
	}
	
	
	public List<LoginsPorDia> buscaLoginsPorDia(){
		//prepara��o
		LoginsPorDia dia2 = null;
		Usuario usuario = new Usuario();
		String dataAtual = usuario.dataAtual();
		String[] dividido = dataAtual.split("-"); 
		int dia = Integer.parseInt(dividido[2]);
		int mes = Integer.parseInt(dividido[1]);
		int ano = Integer.parseInt(dividido[0]);
		
		List<LoginsPorDia> listaDeLogins = new ArrayList<LoginsPorDia>();
		//fim da prepara��o
		
		
		
		String comando = "SELECT data ,COUNT(data) AS quantidade FROM entradas WHERE data BETWEEN '"+ano+"-"+mes+"-01' AND '"+ano+"-"+mes+"-"+dia+"' GROUP BY data"  ; 
		
		try {
			java.sql.Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				dia2 = new LoginsPorDia();
				dividido = rs.getString("data").split("-");
				dia2.setDia(Integer.parseInt(dividido[2]));
				dia2.setQuantidade(rs.getInt("quantidade"));
				listaDeLogins.add(dia2);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return listaDeLogins;
	}
	
	public List<Usuario> buscar(String nivel, String busca) {
		// TODO Auto-generated method stub
		return null;
	}
}

