<?php
include "../database.php"; //importando database

class SubcategoriaController
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getAllCategoria()
    {
        $sql = "SELECT * FROM subcategorias";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $subcategorias = $db->fetchAll(PDO::FETCH_ASSOC);
        return $subcategorias;
    }
    
    public function CreateNewSubcategoria()
    {
        $subcategoria = json_decode(file_get_contents("php://input"));

        if ($subcategoria === null){
            return["Mensagem" => "ERRO AO DECODIFICAR DADOS JSON"];
        }

        $sql = "INSERT INTO subcategorias (categoria_id, nome) VALUES (:categoria_id, :nome)";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":categoria_id", $subcategoria->categoria_id);
        $db->bindParam(":nome", $subcategoria->nome);

        if ($db->execute()) {
            $resposta = ["Mensagem" => "Subcategoria Cadastrado com Sucesso!"];
        } else {
            $resposta = ["Mensagem" => "Erro ao cadastrar o Subcategoria."];
        }
    
        return $resposta;
    }

    public function GetSubcategoriaById(int $id)
    {
        try {
            $sql = "SELECT * FROM subcategorias WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $id);
            $db->execute();
            $subcategoria = $db->fetch(PDO::FETCH_ASSOC);
            return $subcategoria;

        } catch (\Exception $th) {
            echo "Erro ao buscar o Subcategoria: " . $th->getMessage();
            return null;
        }
    }

    private function checkSubcategoriaExistsById(int $id){
        $query = "SELECT COUNT(*) FROM subcategorias WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count > 0;
    }

    public function updateCategoriaById(int $id){
        try {
            $subcategoria = json_decode(file_get_contents('php://input'));
    

            $subcategoriaExists = $this->checkSubcategoriaExistsById($id);
            if (!$subcategoriaExists) {
                return json_encode(['status' => 0, 'message' => 'Subcategoria não encontrado.']);
            }
    
            $sql = "UPDATE subcategorias SET categoria_id = :categoria_id, nome = :nome WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(":categoria_id", $subcategoria->categoria_id);
            $stmt->bindParam(':nome', $subcategoria->nome);
           
    
            if ($stmt->execute()) {
                return json_encode(['status' => 1, 'message' => 'Registro atualizado com sucesso.']);
            } else {
                return json_encode(['status' => 0, 'message' => 'Falha ao atualizar o registro.']);
            }
    
        } catch (\Exception $e) {
            error_log('Erro ao atualizar Subcategoria: ' . $e->getMessage());
            return json_encode(['status' => 0, 'message' => 'Erro ao atualizar Subcategoria.']);
        }
    }
}