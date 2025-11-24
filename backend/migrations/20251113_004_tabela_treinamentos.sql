-- Migration: Criar tabela usuarios
-- Data: 2025-11-11
-- Descrição: Tabela para os usuários do sistema

-- RELATÓRIO:		(Por favor, anote as alterações que fizer)
-- 	2025-11-11
-- 		Giovanne : Criação das tabelas e inserts


USE CONTROLE_TREINAMENTOS;

-- Criando a tabela de treinamentos
CREATE TABLE if not exists treinamentos (
	id					INT PRIMARY KEY AUTO_INCREMENT,
    nome				VARCHAR(255) NOT NULL,
    descricao			VARCHAR(255) NOT NULL,
    data_criacao		DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao	DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    numSessoes			INT,
    idCriador			INT,
    estado              ENUM('Pendente', 'Em andamento', 'Concluido', 'Cancelado') NOT NULL DEFAULT 'Pendente',
    
    FOREIGN KEY (idCriador) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- =====================================================================================================================================

/*
-- Criando a tabela de sessoes de treinamento
/*
CREATE TABLE if not exists sessoes (
	id					INT PRIMARY KEY AUTO_INCREMENT,
    idTreinamento		INT,
    dia					DATETIME,
    
    FOREIGN KEY (idTreinamento) REFERENCES treinamentos(id) ON DELETE CASCADE
);

-- Inserindo dados de teste na tabela  de treinamentos

INSERT INTO sessoes (idTreinamento, dia) values 
(2, '2025-11-20 12:00:00'),
(3, '2025-11-30 10:30:00'),
(3, '2025-12-10 14:30:00'),
(4, '2025-12-01 13:00:00')
;
*/
<<<<<<< HEAD
=======

>>>>>>> ff79dff5cecbaba6cc2ff4161baf55f88032dbf5
-- =====================================================================================================================================
-- Criando a tabela de participacoes
CREATE TABLE if not exists participacoes (
	idTreinamento			INT,
    idParticipante			INT,
    PRIMARY KEY (idTreinamento, idParticipante),
    
    FOREIGN KEY (idTreinamento) REFERENCES treinamentos(id) ON DELETE CASCADE,
    FOREIGN KEY (idParticipante) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =====================================================================================================================================
-- Criando a tabela de certificados
/*
CREATE TABLE if not exists certificados (
	idUsuario		INT ,
    idTreinamento	INT,
    PRIMARY KEY (idUsuario, idTreinamento),
    
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (idTreinamento) REFERENCES treinamentos(id) ON DELETE CASCADE
);
*/

-- =====================================================================================================================================