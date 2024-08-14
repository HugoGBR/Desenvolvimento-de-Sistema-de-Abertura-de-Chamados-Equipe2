<?php
include "../controller/SubcategoriaController.php";

$subcategoriaController = new SubcategoriaController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if (isset($_REQUEST["acao"])) {
    $acao = $_REQUEST["acao"];
    $id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

    switch ($acao) {
        case "getAllSubcategorias":
            if ($id !== null) {
                echo json_encode(["error" => "Acao getAllSubcategorias nao aceita um ID"]);
            } else {
                $subcategorias = $subcategoriaController->getAllCategoria();
                echo json_encode($subcategorias);
            }
            break;

        case "CreateNewSubcategoria":
            if ($id !== null) {
                echo json_encode(["error" => "Acao CreateNewSubcategoria nao aceita um ID"]);
            } else {
                $mensagem = $subcategoriaController->CreateNewSubcategoria();
                echo json_encode($mensagem);
            }
            break;

        case "GetSubcategoriaById":
            if ($id !== null) {
                $subcategoria = $subcategoriaController->GetSubcategoriaById($id);
                echo json_encode($subcategoria);
            } else {
                echo json_encode(["error" => "Acao GetSubcategoriaById necessita de um ID"]);
            }
            break;

        case "updateSubcategoriaById":
            if ($id !== null) {
                $mensagem = $subcategoriaController->updateCategoriaById($id);
                echo $mensagem;
            } else {
                echo json_encode(["error" => "Acao updateSubcategoriaById necessita de um ID"]);
            }
            break;

        default:
            echo json_encode(["error" => "Acao nao reconhecida."]);
            break;
    }
} else {
    echo json_encode(["error" => "Acao nao especificada."]);
}
