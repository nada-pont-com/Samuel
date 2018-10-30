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

import br.com.mygame.classes.FaixaEtaria;
import br.com.mygame.conexao.Conexao;
import br.com.mygame.jdbc.JDBCUsuarioDAO;


@WebServlet("/GraficoFaixaEtaria")
public class GraficoFaixaEtaria extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public GraficoFaixaEtaria() {
        super();
        // TODO Auto-generated constructor stub
    }

    private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	//int[] faixaEtaria = new int[8];
    	
    	Conexao conec = new Conexao();
		Connection conexao = conec.abrirConexao();
		JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
		List<FaixaEtaria> jogadores = jdbcUsuario.buscaJogadoresPorFaixaEtaria();
		String json = new Gson().toJson(jogadores);
    	try {
    		response.setContentType("application/json");
    		response.setCharacterEncoding("UTF-8");
    		response.getWriter().write(json);
    	} catch (IOException e) {
    		e.printStackTrace();
    	}
		/*
		if (zeroAnove!=nascimento(2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009)){
			zeroAnove +1 != zeroAnove;
		}else if (dezAquinze!=nascimento(2008, 2007, 2006, 2005, 2004, 2003)){
			dezAquinze +1 != dezAquinze;
			}else if (dezseisAvinte!=nascimento(2002, 2001, 2000, 1999, 1998)){
				dezseisAvinte + 1 != dezseisAvinte;
			}else if (vinteumAtrinta!=nascimento(1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988)){
				vinteumAtrinta + 1 != vinteumAtrinta;
			}else if (tresumAtrescinco!=nascimento(1987, 1986, 1985, 1984, 1983)){
				tresumAtrescinco +1 != tresumAtrescinco; 
			}else if(tresseisAquarenta!=nascimento(1982, 1981, 1980, 1979, 1978)){
				tresseisAquarenta +1 != tresseisAquarenta;
			}else if(quatroumAcincocinco!=nascimento(1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963)){
				quatroumAcincocinco +1 != quatroumAcincocinco;
			}else if(maiorcincocinco <1962){
				maiorcincocinco +1 != maiorcincocinco;
			}
		*/
		
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request,response);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request,response);
	}

}
