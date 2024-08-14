<?php
include "../controller/CategoriaController.php";

$categoriaController = new CategoriaController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if (isset($_REQUEST["acao"])) {
    $acao = $_REQUEST["acao"];
    $id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

    switch ($acao) {
        case "getAllCategorias":
            if ($id !== null) {
                echo json_encode(["error" => "Acao getAllCategorias nao aceita um ID"]);
            } else {
                $categorias = $categoriaController->getAllCategoria();
                echo json_encode($categorias);
            }
            break;

        case "CreateNewCategoria":
            if ($id !== null) {
                echo json_encode(["error" => "Acao CreateNewCategoria nao aceita um ID"]);
            } else {
                $mensagem = $categoriaController->CreateNewCategoria();
                echo json_encode($mensagem);
            }
            break;

        case "GetCategoriaById":
            if ($id !== null) {
                $categoria = $categoriaController->GetCategoriaById($id);
                echo json_encode($categoria);
            } else {
                echo json_encode(["error" => "Acao GetCategoriaById necessita de um ID"]);
            }
            break;

        case "updateCategoriaById":
            if ($id !== null) {
                $mensagem = $categoriaController->updateCategoriaById($id);
                echo $mensagem;
            } else {
                echo json_encode(["error" => "Acao updateCategoriaById necessita de um ID"]);
            }
            break;

        default:
            echo json_encode(["error" => "Acao nao reconhecida."]);
            break;
    }
} else {
    echo json_encode(["error" => "Acao nao especificada."]);
}
