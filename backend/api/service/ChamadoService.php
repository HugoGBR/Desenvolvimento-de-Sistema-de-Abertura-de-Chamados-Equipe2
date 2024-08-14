<?php
include "../controller/ChamadoController.php";

$chamadoController = new ChamadoController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if (isset($_REQUEST["acao"])) {
    $acao = $_REQUEST["acao"];
    $id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

    switch ($acao) {
        case "getAllChamados":
            if ($id !== null) {
                echo json_encode(["error" => "Ação getAllChamados não aceita um ID"]);
            } else {
                $chamados = $chamadoController->getAllChamados();
                echo json_encode($chamados);
            }
            break;

        case "CreateNewChamado":
            if ($id !== null) {
                echo json_encode(["error" => "Ação CreateNewChamado não aceita um ID"]);
            } else {
                $mensagem = $chamadoController->CreateNewChamado();
                echo json_encode($mensagem);
            }
            break;

        case "GetChamadoById":
            if ($id !== null) {
                $chamado = $chamadoController->getChamadoById($id);
                echo json_encode($chamado);
            } else {
                echo json_encode(["error" => "Ação GetChamadoById necessita de um ID"]);
            }
            break;

        case "updateChamadoById":
            if ($id !== null) {
                $mensagem = $chamadoController->updateChamadoById($id);
                echo $mensagem;
            } else {
                echo json_encode(["error" => "Ação updateChamadoById necessita de um ID"]);
            }
            break;

        case "CreateNewAcaoChamado":
            if ($id !== null) {
                echo json_encode(["error" => "Ação CreateNewAcaoChamado não aceita um ID"]);
            } else {
                $mensagem = $chamadoController->CreateNewAcaoChamado();
                echo json_encode($mensagem);
            }
            break;

        default:
            echo json_encode(["error" => "Ação não reconhecida."]);
            break;
    }
} else {
    echo json_encode(["error" => "Ação não especificada."]);
}
