INSERT INTO treinamentos (nome, descricao, idCriador, estado) values 
('Treinamento Power Apps', 'Treinamento voltado a apresentar o aplicativo Microsoft Power Apps e suas funções aos membros de time da equipe de IT - Tecnologia da Informação', 2, 'Pendente'),
('Treinamento 2', 'Descrição do treinamento 2', 2, 'Em andamento'),
('Treinamento 3', 'Descrição do treinamento 3', 2, 'Cancelado'),
('Treinamento 4', 'Descrição do treinamento 4', 2, 'Concluido'),
('Treinamento 5', 'Descrição do treinamento 5', 1, 'Pendente'),
('Treinamento 6', 'Descrição do treinamento 6', 1, 'Em andamento'),
('Treinamento 7', 'Descrição do treinamento 7', 1, 'Cancelado'),
('Treinamento 8', 'Descrição do treinamento 8', 1, 'Concluido');

SELECT * FROM treinamentos;
DELETE FROM treinamentos WHERE id != 100;


INSERT INTO participacoes (idTreinamento, idParticipante) values 
(5,2),
(6,2),
(7,2),
(8,2);



INSERT INTO participacoes (idTreinamento, idParticipante) values 
(5,4);


SELECT t.nome, t.descricao, t.data_criacao, t.data_atualizacao, t.numSessoes, t.estado, u.nome as criador FROM treinamentos t 
INNER JOIN usuarios u on u.id = t.idCriador
WHERE t.id = 1;