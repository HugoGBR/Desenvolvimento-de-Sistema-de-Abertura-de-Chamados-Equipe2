<?php
include "../database.php"; // Importando database

class ChamadoController
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getAllChamados()
    {
        $sql = "SELECT * FROM chamados";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $chamados = $db->fetchAll(PDO::FETCH_ASSOC);
        return $chamados;
    }

    public function CreateNewChamado()
    {
        $chamado = json_decode(file_get_contents("php://input"));

        if ($chamado === null) {
            return ["Mensagem" => "Erro ao decodificar dados JSON"];
        }

        $sql = "INSERT INTO chamados (usuario_id, subcategoria_id, descricao, prioridade, status, tecnico_id) 
                VALUES (:usuario_id, :subcategoria_id, :descricao, :prioridade, :status, :tecnico_id)";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":usuario_id", $chamado->usuario_id);
        $db->bindParam(":subcategoria_id", $chamado->subcategoria_id);
        $db->bindParam(":descricao", $chamado->descricao);
        $db->bindParam(":prioridade", $chamado->prioridade);
        $db->bindParam(":status", $chamado->status);
        $db->bindParam(":tecnico_id", $chamado->tecnico_id);

        if ($db->execute()) {
            $resposta = ["Mensagem" => "Chamado cadastrado com sucesso!"];
        } else {
            $resposta = ["Mensagem" => "Erro ao cadastrar o chamado."];
        }

        return $resposta;
    }

    public function getChamadoById(int $id)
    {
        try {
            $sql = "SELECT * FROM chamados WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $id);
            $db->execute();
            $chamado = $db->fetch(PDO::FETCH_ASSOC);
            return $chamado;

        } catch (\Exception $th) {
            error_log("Erro ao buscar o chamado: " . $th->getMessage());
            return null;
        }
    }

    public function updateChamadoById(int $id)
    {
        try {
            $chamado = json_decode(file_get_contents('php://input'));

            $sql = "UPDATE chamados SET usuario_id = :usuario_id, subcategoria_id = :subcategoria_id, 
                    descricao = :descricao, prioridade = :prioridade, status = :status, tecnico_id = :tecnico_id 
                    WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(":usuario_id", $chamado->usuario_id);
            $stmt->bindParam(":subcategoria_id", $chamado->subcategoria_id);
            $stmt->bindParam(":descricao", $chamado->descricao);
            $stmt->bindParam(":prioridade", $chamado->prioridade);
            $stmt->bindParam(":status", $chamado->status);
            $stmt->bindParam(":tecnico_id", $chamado->tecnico_id);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                return json_encode(['status' => 1, 'message' => 'Chamado atualizado com sucesso.']);
            } else {
                return json_encode(['status' => 0, 'message' => 'Falha ao atualizar o chamado.']);
            }

        } catch (\Exception $e) {
            error_log('Erro ao atualizar chamado: ' . $e->getMessage());
            return json_encode(['status' => 0, 'message' => 'Erro ao atualizar chamado.']);
        }
    }

    public function CreateNewAcaoChamado()
    {
        $acaoChamado = json_decode(file_get_contents("php://input"));

        if ($acaoChamado === null) {
            return ["Mensagem" => "Erro ao decodificar dados JSON"];
        }

        $sql = "INSERT INTO acoes_chamados (chamado_id, usuario_id, acao) 
                VALUES (:chamado_id, :usuario_id, :acao)";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":chamado_id", $acaoChamado->chamado_id);
        $db->bindParam(":usuario_id", $acaoChamado->usuario_id);
        $db->bindParam(":acao", $acaoChamado->acao);

        if ($db->execute()) {
            $resposta = ["Mensagem" => "Ação registrada com sucesso!"];
        } else {
            $resposta = ["Mensagem" => "Erro ao registrar a ação do chamado."];
        }

        return $resposta;
    }
}
