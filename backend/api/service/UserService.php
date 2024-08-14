<?php
include "../controller/UserController.php";

$userController = new UserController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if (isset($_REQUEST["acao"])) {
    $acao = $_REQUEST["acao"];
    $id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

    switch ($acao) {
        case "getAllUsers":
            if ($id !== null) {
                echo json_encode(["error" => "Acao getAllUsers nao aceita um ID"]);
            } else {
                $users = $userController->getAllUsers();
                echo json_encode($users);
            }
            break;

        case "CreateNewUser":
            if ($id !== null) {
                echo json_encode(["error" => "Acao CreateNewUser nao aceita um ID"]);
            } else {
                $mensagem = $userController->CreateNewUser();
                echo json_encode($mensagem);
            }
            break;

        case "GetUserById":
            if ($id !== null) {
                $user = $userController->getUserById($id);
                echo json_encode($user);
            } else {
                echo json_encode(["error" => "Acao GetUserById necessita de um ID"]);
            }
            break;

        case "validacaoLogin":
            $result = $userController->validacaoLogin();
            echo json_encode($result);
            break;

        case "updateUserById":
            if ($id !== null) {
                $mensagem = $userController->updateUserById($id);
                echo $mensagem;
            } else {
                echo json_encode(["error" => "Acao updateUserById necessita de um ID"]);
            }
            break;

        default:
            echo json_encode(["error" => "Acao nao reconhecida."]);
            break;
    }
} else {
    echo json_encode(["error" => "Acao nao especificada."]);
}
