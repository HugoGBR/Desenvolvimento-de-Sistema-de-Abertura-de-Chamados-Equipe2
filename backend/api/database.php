<?php
class Database
{
    private $server = "localhost";
    private $dbnome = "Sistema_Chamados";
    private $user = "root";
    private $pass = "";

    public function connect()
    {
        try {
            $conn = new PDO(
                "mysql:host=" . $this->server . ";dbname=" . $this->dbnome,
                $this->user,
                $this->pass
            );
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database erro: " . $e->getMessage();
        }
    }

    public function checkConnection()
    {
        $connection = $this->connect();
        if ($connection) {
            echo "Conexão com o banco de dados foi bem-sucedida!";
        } else {
            echo "Falha na conexão com o banco de dados.";
        }
    }
}

$db = new Database();
$db->checkConnection();
?>
