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
                echo json_encode(["error" => "Ação GetAllUsers não aceita um ID"]);
            } else {
                $users = $userController->getAllUsers();
                echo json_encode($users);
            }
            break;

        case "CreateNewUser":
            if ($id !== null) {
                echo json_encode(["error" => "Ação CreateNewUser não aceita um ID"]);
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
                echo json_encode(["error" => "Ação GetUserById necessita de um ID"]);
            }
            break;
    }
} else {
    echo json_encode(["error" => "Ação não especificada."]);
}