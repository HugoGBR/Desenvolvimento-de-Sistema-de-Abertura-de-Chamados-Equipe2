create database Sistema_Chamados;
use Sistema_Chamados;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    tipo ENUM('usuario', 'suporte', 'administrador') NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE subcategorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE chamados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    subcategoria_id INT NOT NULL,
    descricao TEXT NOT NULL,
    prioridade ENUM('baixa', 'media', 'alta') NOT NULL,
    status ENUM('aberto', 'em_andamento', 'resolvido', 'fechado') DEFAULT 'aberto',
    tecnico_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (subcategoria_id) REFERENCES subcategorias(id),
    FOREIGN KEY (tecnico_id) REFERENCES usuarios(id)
);

CREATE TABLE acoes_chamados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chamado_id INT NOT NULL,
    usuario_id INT NOT NULL,
    acao TEXT NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chamado_id) REFERENCES chamados(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Inserir categorias e subcategorias
INSERT INTO categorias (nome) VALUES ('Hardware'), ('Software');
INSERT INTO subcategorias (categoria_id, nome) VALUES 
(1, 'Impressora'), 
(1, 'Monitor'), 
(2, 'Sistema Operacional'), 
(2, 'Aplicativos');

-- Inserir usuários
INSERT INTO usuarios (nome, email, telefone, tipo, senha) VALUES 
('João Silva', 'joao.silva@example.com', '123456789', 'usuario', 'senha123'),
('Maria Souza', 'maria.souza@example.com', '987654321', 'suporte', 'senha456');

-- Inserir chamados
INSERT INTO chamados (usuario_id, subcategoria_id, descricao, prioridade) VALUES 
(1, 1, 'Impressora não está funcionando', 'alta');

-- Inserir ações de chamados
INSERT INTO acoes_chamados (chamado_id, usuario_id, acao) VALUES 
(1, 2, 'Chamado recebido e em análise.');


-- Trigger para criar uma entrada na tabela acoes_chamados quando um chamado é criado
DELIMITER //

CREATE TRIGGER trg_insert_acao_chamado
AFTER INSERT ON chamados
FOR EACH ROW
BEGIN
    -- Insere uma nova ação com a descrição "Chamado criado" quando um chamado é inserido
    INSERT INTO acoes_chamados (chamado_id, usuario_id, acao) 
    VALUES (NEW.id, NEW.usuario_id, CONCAT('Chamado criado com status: ', NEW.status));
END;

//

DELIMITER ;


-- Trigger para registrar uma ação sempre que um chamado for atualizado (mudança de status ou técnico)
DELIMITER //

CREATE TRIGGER trg_update_acao_chamado
AFTER UPDATE ON chamados
FOR EACH ROW
BEGIN
    -- Verifica se houve mudança no status ou no técnico responsável pelo chamado
    IF NEW.status != OLD.status OR NEW.tecnico_id != OLD.tecnico_id THEN
        -- Insere uma nova ação com a descrição da atualização
        INSERT INTO acoes_chamados (chamado_id, usuario_id, acao) 
        VALUES (NEW.id, NEW.usuario_id, 
                CONCAT('Chamado atualizado - Novo status: ', NEW.status, ', Técnico: ', NEW.tecnico_id));
    END IF;
END;

//

DELIMITER ;


