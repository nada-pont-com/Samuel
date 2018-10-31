-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Tempo de geração: 02/10/2018 às 20:13
-- Versão do servidor: 5.7.11-log
-- Versão do PHP: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `samuel_bd`
--
CREATE DATABASE IF NOT EXISTS `samuel_bd` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `samuel_bd`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `entradas`
--

DROP TABLE IF EXISTS `entradas`;
CREATE TABLE IF NOT EXISTS `entradas` (
  `id_entradas` int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'ID do login de usuário que será usado para controle de logins diários.',
  `data` date NOT NULL COMMENT 'Corresponde à data em que aquele login foi feito',
  `hora` time NOT NULL COMMENT 'Corresponde à hora na qual aquele login foi feito',
  `usuarios_login` varchar(20) NOT NULL COMMENT 'Guarda o login dos usuários que poderá ser visto em seu perfil por ele mesmo, será visto nos eventuais rankings em que ele estiver aparecendo pelos outros jogadores e será usado na autenticação juntamente com o campo "senha".',
  PRIMARY KEY (`id_entradas`),
  KEY `fk_entradas_usuarios_idx` (`usuarios_login`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='Tabela que salva dados toda vez que um usuário x se loga para gerar gráficos acessíveis apenas aos administradores.';

--
-- Fazendo dump de dados para tabela `entradas`
--

INSERT INTO `entradas` (`id_entradas`, `data`, `hora`, `usuarios_login`) VALUES
(00001, '2018-08-17', '07:13:59', 'gabriel'),
(00002, '2018-08-18', '15:25:05', 'marlow'),
(00003, '2018-08-18', '04:11:14', 'marlow'),
(00004, '2018-08-19', '07:11:11', 'prp');

-- --------------------------------------------------------

--
-- Estrutura para tabela `partidas`
--

DROP TABLE IF EXISTS `partidas`;
CREATE TABLE IF NOT EXISTS `partidas` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT 'Guarda o ID de cada partida que é jogada por um jogador',
  `moedas` int(6) NOT NULL COMMENT 'Guarda a quantidade soma de moedas (coletadas - perdidas) ao final da partida',
  `s_tempo` int(4) NOT NULL COMMENT 'Tempo restante para concluir a partida depois do término da mesma',
  `pontuacao` int(8) NOT NULL COMMENT 'Soma dos campos moedas e s_tempo',
  `fase` tinyint(1) NOT NULL COMMENT 'Define em qual fase o jogador está jogando a partida',
  `usuarios_login` varchar(20) NOT NULL COMMENT 'Guarda o login dos usuários que poderá ser visto em seu perfil por ele mesmo, será visto nos eventuais rankings em que ele estiver aparecendo pelos outros jogadores e será usado na autenticação juntamente com o campo "senha".',
  PRIMARY KEY (`id`),
  KEY `fk_partidas_usuarios1_idx` (`usuarios_login`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='Guarda informações sobre partidas jogadas por jogadores logados no servidor.';

--
-- Fazendo dump de dados para tabela `partidas`
--

INSERT INTO `partidas` (`id`, `moedas`, `s_tempo`, `pontuacao`, `fase`, `usuarios_login`) VALUES
(0000000001, 20, 150, 200, 1, 'gabriel'),
(0000000002, 30, 150, 210, 1, 'marlow'),
(0000000003, 50, 160, 230, 2, 'prp'),
(0000000004, 80, 120, 100, 1, 'prp');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `login` varchar(20) NOT NULL COMMENT 'Guarda o login dos usuários que poderá ser visto em seu perfil por ele mesmo, será visto nos eventuais rankings em que ele estiver aparecendo pelos outros jogadores e será usado na autenticação juntamente com o campo "senha".',
  `permissao` tinyint(1) NOT NULL COMMENT 'Dita a permissão que o usuário possui, definindo seus menus diferenciados e status no servidor:\n0 = Administrador\n1 = Jogador\n0 = Administrador\nO jogador não tem acesso aos próprios logins nem aos dos outros jogadores, e pode jogar o jogo, excluir sua conta e alterar seus dados, tem acesso ao ranking geral. O administrador pode ver os logins dos jogadores, ver o ranking geral, cadastrar outros administradores, ver seus dados, excluir sua conta e alterar seus dados, porém é impossibilitado de jogar',
  `email` varchar(45) NOT NULL COMMENT 'Guarda o email do usuario referido que poderá ser visto por ele mesmo',
  `nascimento` date NOT NULL COMMENT 'Guarda a data de nascimento do usuario referido que poderá ser vista por ele mesmo',
  `nome` varchar(70) NOT NULL COMMENT 'Guarda o nome do usuário, que poderá ser visto por ele mesmo',
  `senha` varchar(45) NOT NULL COMMENT 'Guarda a senha do usuário e será útil na hora da autenticação do login.',
  `skin_ativa` int(2) DEFAULT NULL COMMENT 'Guarda qual skin o usuário está usando no momento em que ele se logou pela última vez:\n0 - Nula (Administrador)\n1 - Standart Samuel (Padrão)\n2 -  Samuel Guerreiro Asteca\n3 -  Standart Samuel (Rosa)\n4 -  Samuel da quebrada\n5 -  Samuel Professor\n6 -  Daniel Marcão',
  `data_cadastro` date NOT NULL COMMENT 'Salva a data em que o usuário se cadastrou, constará nos dados de gráficos abertos apenas para administradores',
  PRIMARY KEY (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabela que salva as informações dos usuários que se cadastraram\n';

--
-- Fazendo dump de dados para tabela `usuarios`
--

INSERT INTO `usuarios` (`login`, `permissao`, `email`, `nascimento`, `nome`, `senha`, `skin_ativa`, `data_cadastro`) VALUES
('234', 1, '234', '3000-02-23', '234', '289DFF07669D7A23DE0EF88D2F7129E7', NULL, '2018-10-02'),
('bonoro', 0, 'melhorjair@seacustumando.com', '1917-07-10', 'jair messias bolsonaro', 'E8D95A51F3AF4A3B134BF6BB680A213A', NULL, '2018-10-02'),
('gabriel', 0, 'gabriel@gmail.com', '2001-03-15', 'gabriel dos reis', 'senha', 2, '2018-08-19'),
('marlow', 0, 'marlowarrasa@gmail.com', '1999-09-01', 'Marlow', 'e8d95a51f3af4a3b134bf6bb680a213a', 1, '2018-08-17'),
('prp', 0, 'prp@gmail.com', '2000-09-01', 'Rodrigo Natanael', 'E8D95A51F3AF4A3B134BF6BB680A213A', 1, '2018-08-18');

--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `entradas`
--
ALTER TABLE `entradas`
  ADD CONSTRAINT `fk_entradas_usuarios` FOREIGN KEY (`usuarios_login`) REFERENCES `usuarios` (`login`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `partidas`
--
ALTER TABLE `partidas`
  ADD CONSTRAINT `fk_partidas_usuarios1` FOREIGN KEY (`usuarios_login`) REFERENCES `usuarios` (`login`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
