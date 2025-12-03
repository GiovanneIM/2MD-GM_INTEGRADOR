INSERT INTO treinamentos (nome, descricao, idCriador, estado) values 
('Treinamento Power Apps', 'Treinamento voltado a apresentar o aplicativo Microsoft Power Apps e suas funções aos membros de time da equipe de IT - Tecnologia da Informação', 2, 'Pendente'),
('Treinamento 2', 'Descrição do treinamento 2', 2, 'Em andamento'),
('Treinamento 3', 'Descrição do treinamento 3', 2, 'Cancelado'),
('Treinamento 4', 'Descrição do treinamento 4', 2, 'Concluido'),
('Treinamento 5', 'Descrição do treinamento 5', 3, 'Pendente'),
('Treinamento 6', 'Descrição do treinamento 6', 3, 'Em andamento'),
('Treinamento 7', 'Descrição do treinamento 7', 3, 'Cancelado'),
('Treinamento 8', 'Descrição do treinamento 8', 3, 'Concluido');

SELECT * FROM treinamentos;
DELETE FROM treinamentos WHERE id != 100;


INSERT INTO participacoes (idTreinamento, idParticipante) values 
(5,2),
(6,2),
(7,2),
(8,2);



INSERT INTO participacoes (idTreinamento, idParticipante) values 
(5,4);


SELECT t.*, u.nome as criador FROM treinamentos t 
INNER JOIN usuarios u on u.id = t.idCriador;


UPDATE treinamentos t SET t.estado = 'Pendente' WHERE t.id = 1;

SELECT id, nome, email, telefone, tipo, id_equipe 
FROM usuarios u 
WHERE u.id_equipe = 1;


SELECT COUNT(*) AS total
FROM treinamentos t
INNER JOIN participacoes p on p.idTreinamento = t.id
WHERE p.idParticipante = 2;