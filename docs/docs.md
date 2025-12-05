Desenvolva sua documentação aqui

# Integrantes do grupo:

- Giovanne Isaac Marques
- Gabriel Queiroz Marques <-- Líder --> 
- Arthur Gonçalves Polo

# Papéis de cada integrante:

- Giovanne Isaac Marques -> Desenvolvimento de backend, frontend e banco de dados mySQL.

- Gabriel Queiroz Marquez -> Desenvolvimento de frontend, páginação e documentação.

- Arthur Gonçalves Polo -> Desenvolvimento de backend, frontend e documentação.

# Sistema de login:

- Login ADM -> USUÁRIO = admin@produtos.com / SENHA = 123456

- Login FT -> USUÁRIO = joao@email.com / SENHA = 123456

- Login MT -> USUÁRIO = pedro@email.com / SENHA = 123456

# Instalação do projeto:

- 1° Passo: Verificar todos os arquivos necessários, como o .env (DB_HOST=localhost
                                                                    DB_PORT=3306
                                                                    DB_USER=root
                                                                    DB_PASSWORD=
                                                                    DB_NAME=CONTROLE_TREINAMENTOS).
- 2° Passo: Ligar o xammp e iniciar o mysql para funcionamento do banco de dados, na porta 3306, e abrir o mysql workbench.
- 3° Passo: Abrir e executar os sql scripts da pasta /backend/migrations em sequencia númerica.
- 4° Passo: Abrir um terminal dentro da pasta /backend e executar /* npm i */ e executar o comando /* npm start */.
- 5° Passo: Abrir um segundo terminal dentro da pasta /frontend e executar /* npm i */ e executar o comando /* npm run dev */
- 6° Passo: Abrir o localhost na porta indicado no terminal do frontend.

# Funcionalidades do projeto

- MT --> Visualização e especificação de treinamentos ofertados e agendados.
         Dashboards de acompanhamento e estatísticas de treinamentos.
         Visualização de equipes.
         Informação de treinamentos pelo calendário.
         Alteração do perfil pessoal.

- FT --> Visualização e especificação de treinamentos ofertados e agendados.
         Dashboards de acompanhamento e estatísticas de treinamentos.
         Visualização de equipes.
         Informação de treinamentos pelo calendário.
         Criação de novos treinamentos (Mediante aprovação do admin).
         Criação de sessões, colocando horários e local.
         Conclusão de sessões e treinamentos.
         Alteração do perfil pessoal.

- ADMIN --> Aprovação e reprovação de treinamentos criados pelo FT.
            Registrar novos usuários (Cargo, área e informações pessoais).
            Acompanhamento de treinamentos.
            Alteração do perfil pessoal.

