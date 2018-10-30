package br.com.mygame.jdbcinterfaces;

import java.util.List;

import br.com.mygame.classes.Usuario;

public interface UsuarioDAO {

	public boolean inserir(Usuario usuario);
	public Usuario buscarPorLogin(String login);
	public boolean atualizar(Usuario usuario);
	public boolean deletar(String usuario);
	public List<Usuario> buscar(String nivel, String busca);

}
