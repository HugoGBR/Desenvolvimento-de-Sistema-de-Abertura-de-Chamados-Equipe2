<?php
include "../database.php"; //importando database

class CategoriaController
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getAllCategoria()
    {
        $sql = "SELECT * FROM categorias";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $categorias = $db->fetchAll(PDO::FETCH_ASSOC);
        return $categorias;
    }
    
    public function CreateNewCategoria()
    {
        $categoria = json_decode(file_get_contents("php://input"));

        if ($categoria === null){
            return["Mensagem" => "ERRO AO DECODIFICAR DADOS JSON"];
        }

        $sql = "INSERT INTO categorias (nome) VALUES (:nome)";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":nome", $categoria->nome);

        if ($db->execute()) {
            $resposta = ["Mensagem" => "Categoria Cadastrado com Sucesso!"];
        } else {
            $resposta = ["Mensagem" => "Erro ao cadastrar o Categoria."];
        }
    
        return $resposta;
    }

    public function GetCategoriaById(int $id)
    {
        try {
            $sql = "SELECT * FROM categorias WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $id);
            $db->execute();
            $categoria = $db->fetch(PDO::FETCH_ASSOC);
            return $categoria;

        } catch (\Exception $th) {
            echo "Erro ao buscar o Categoria: " . $th->getMessage();
            return null;
        }
    }

    private function checkCategoriaExistsById(int $id){
        $query = "SELECT COUNT(*) FROM categorias WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count > 0;
    }

    public function updateCategoriaById(int $id){
        try {
            $categoria = json_decode(file_get_contents('php://input'));
    

            $categoriaExists = $this->checkCategoriaExistsById($id);
            if (!$categoriaExists) {
                return json_encode(['status' => 0, 'message' => 'Categoria não encontrado.']);
            }
    
            $sql = "UPDATE categorias SET nome = :nome WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':nome', $categoria->nome);
           
    
            if ($stmt->execute()) {
                return json_encode(['status' => 1, 'message' => 'Registro atualizado com sucesso.']);
            } else {
                return json_encode(['status' => 0, 'message' => 'Falha ao atualizar o registro.']);
            }
    
        } catch (\Exception $e) {
            error_log('Erro ao atualizar categoria: ' . $e->getMessage());
            return json_encode(['status' => 0, 'message' => 'Erro ao atualizar categoria.']);
        }
    }
}