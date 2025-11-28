insert into treinamentos 
(nome, idCriador, estado, descricao)
values 
('Treinamento Power Apps', 2, 'Pendente', 'Treinamento para teste do sistema - ID treinamento: 1'),
('Treinamento Word', 2, 'Pendente', 'Treinamento para teste do sistema - ID treinamento: 2'),
('Treinamento Power Point', 2, 'Em andamento', 'Treinamento para teste do sistema - ID treinamento: 3'),
('Treinamento Excel', 2, 'Em andamento', 'Treinamento para teste do sistema - ID treinamento: 4'),
('Treinamento Power BI', 2, 'Concluido', 'Treinamento para teste do sistema - ID treinamento: 5'),
('Treinamento Python', 2, 'Concluido', 'Treinamento para teste do sistema - ID treinamento: 6'),
('Treinamento JavaScript', 2, 'Concluido', 'Treinamento para teste do sistema - ID treinamento: 7'),
('Treinamento C#', 2, 'Cancelado', 'Treinamento para teste do sistema - ID treinamento: 8');

INSERT INTO sessoes (idTreinamento, dia, hora_inicio, hora_fim, localidade) values 
(1, '2025-11-29', '12:00:00', '18:00:00', 'Sala de reuniões 4 - 5º andar'),
(1, '2025-12-20', '10:00:00', '14:00:00', 'Sala de treinamentos - 3º andar'),
(2, '2025-12-23', '12:00:00', '18:00:00', 'Sala de reuniões 4 - 5º andar'),
(1, '2025-12-25', '10:00:00', '14:00:00', 'Sala de treinamentos - 3º andar');

insert into participacoes (idTreinamento, idParticipante) values
(1, 2),
(2, 2),
(3, 2),
(4, 2);



SELECT * FROM sessoes WHERE idTreinamento = 1;








-- Pegando os ultimos 6 meses
WITH RECURSIVE ultimos_meses AS (
    SELECT 
        DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01') AS data_base
    UNION ALL
    SELECT 
        DATE_ADD(data_base, INTERVAL 1 MONTH)
    FROM ultimos_meses
    WHERE data_base < DATE_FORMAT(CURDATE(), '%Y-%m-01')
) SELECT DATE_FORMAT(data_base, '%b') AS meses FROM ultimos_meses;


-- TREINAMENTOS PARTICIPADOS nos últimos 6 meses separados por estados
WITH RECURSIVE ultimos_meses AS (
    SELECT 
        DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01') AS data_base
    UNION ALL
    SELECT 
        DATE_ADD(data_base, INTERVAL 1 MONTH)
    FROM ultimos_meses
    WHERE data_base < DATE_FORMAT(CURDATE(), '%Y-%m-01')
)
SELECT
    *
FROM ultimos_meses um
LEFT JOIN treinamentos t
    ON MONTH(t.data_criacao) = MONTH(um.data_base)
   AND YEAR(t.data_criacao) = YEAR(um.data_base)
LEFT JOIN participacoes p
    ON p.idTreinamento = t.id
   AND p.idParticipante = 2
GROUP BY um.data_base, estado
ORDER BY um.data_base, estado;


WITH RECURSIVE ultimos_meses AS (
    SELECT 
        DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01') AS data_base
    UNION ALL
    SELECT 
        DATE_ADD(data_base, INTERVAL 1 MONTH)
    FROM ultimos_meses
    WHERE data_base < DATE_FORMAT(CURDATE(), '%Y-%m-01')
)
SELECT
    DATE_FORMAT(um.data_base, '%b') AS mes,
    COALESCE(t.estado, 'Sem treinamentos') AS estado,
    COUNT(CASE WHEN p.idParticipante = 2 THEN 1 END) AS total
FROM ultimos_meses um
LEFT JOIN treinamentos t
    ON MONTH(t.data_criacao) = MONTH(um.data_base)
   AND YEAR(t.data_criacao) = YEAR(um.data_base)
LEFT JOIN participacoes p
    ON p.idTreinamento = t.id
GROUP BY um.data_base, estado
ORDER BY um.data_base, estado;




-- TREINAMENTOS CRIADOS nos últimos 6 meses separados por estados
WITH RECURSIVE ultimos_meses AS (
    SELECT 
        DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01') AS data_base
    UNION ALL
    SELECT 
        DATE_ADD(data_base, INTERVAL 1 MONTH)
    FROM ultimos_meses
    WHERE data_base < DATE_FORMAT(CURDATE(), '%Y-%m-01')
)
SELECT
    DATE_FORMAT(um.data_base, '%b') AS mes,
    COALESCE(t.estado, 'Sem treinamentos') AS estado,
    COALESCE(COUNT(t.id), 0) AS total
FROM ultimos_meses um
LEFT JOIN treinamentos t
       ON MONTH(t.data_criacao) = MONTH(um.data_base)
      AND YEAR(t.data_criacao) = YEAR(um.data_base)
      AND t.idCriador = 2
GROUP BY mes, estado, um.data_base
ORDER BY um.data_base, estado;
