SELECT * FROM usuarios;
SELECT * FROM equipes;
SELECT * FROM logs;

select * from treinamentos;
select * from participacoes;
select * from sessoes;
select * from certificados;

insert into usuarios (nome, email, senha, id_equipe) values 
("teste1", "usuario@email.com", "123456", 1),
("teste2", "usuario2@email.com", "123456", 1),
("teste3", "usuario3@email.com", "123456", 1),
("teste4", "usuario4@email.com", "123456", 1);

SELECT * FROM usuarios u WHERE u.id_equipe = 1;

SELECT * FROM treinamentos t
INNER JOIN participacoes p on p.idTreinamento = t.id;