<?php
include "../database.php"; //importando database

class Usercontroller
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getAllUsers()
    {
        $sql = "SELECT * FROM usuarios";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }

    public function CreateNewUser()
    {
        $user = json_decode(file_get_contents("php://input"));
    
        if ($user === null) {
            return ["Mensagem" => "Erro ao decodificar os dados JSON."];
        }
    
        $sql = "INSERT INTO usuarios (nome, email, telefone, tipo, senha) VALUES (:nome, :email, :telefone, :tipo, :senha)";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":nome", $user->nome);
        $db->bindParam(":email", $user->email);
        $db->bindParam(":telefone", $user->telefone);
        $db->bindParam(":tipo", $user->tipo);
        $db->bindParam(":senha", $user->senha);
    
        if ($db->execute()) {
            $resposta = ["Mensagem" => "Usuario Cadastrado com Sucesso!"];
        } else {
            $resposta = ["Mensagem" => "Erro ao cadastrar o usuario."];
        }
    
        return $resposta;
    }

    public function validacaoLogin()
    {
        $user = json_decode(file_get_contents("php://input"));
        $sql = "SELECT * FROM usuarios WHERE email = :email AND senha = :senha";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":email", $user->email);
        $db->bindParam(":senha", $user->senha);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);


        if ($users) {
            $resposta = $users;
        }else{
            $resposta = 0;
        }

        return $resposta;
    }
     
    
    
     
    public function getUserById(int $id)
    {
        try {
            $sql = "SELECT * FROM usuarios WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $id);
            $db->execute();
            $user = $db->fetch(PDO::FETCH_ASSOC);
            return $user;

        } catch (\Exception $th) {
            echo "Erro ao buscar o usuario: " . $th->getMessage();
            return null;
        }
    }

    public function updateUserById(int $id){
        try {
            $user = json_decode(file_get_contents('php://input'));
    

            $userExists = $this->checkUserExistsById($id);
            if (!$userExists) {
                return json_encode(['status' => 0, 'message' => 'Usuário não encontrado.']);
            }
    
            $sql = "UPDATE usuarios SET nome = :nome, email = :email, telefone = :telefone, tipo = :tipo, senha = :senha WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':nome', $user->nome);
            $stmt->bindParam(':email', $user->email);
            $stmt->bindParam(':telefone', $user->telefone);
            $stmt->bindParam(':tipo', $user->tipo);
            $stmt->bindParam(':senha', $user->senha);
           
    
            if ($stmt->execute()) {
                return json_encode(['status' => 1, 'message' => 'Registro atualizado com sucesso.']);
            } else {
                return json_encode(['status' => 0, 'message' => 'Falha ao atualizar o registro.']);
            }
    
        } catch (\Exception $e) {
            error_log('Erro ao atualizar usuário: ' . $e->getMessage());
            return json_encode(['status' => 0, 'message' => 'Erro ao atualizar usuário.']);
        }
    }
    


    private function checkUserExistsById(int $id){
        $query = "SELECT COUNT(*) FROM USUARIOS WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count > 0;
    }
}

