import { backendURL } from "./URLS/backurl";
import {criarCookie, getCookie} from "./coockier";
export async function createNewCategoria(
    newNome: string,
    newDescricao: string,
    newTipo: string
) {
    const request = await fetch(`${backendURL()}/UserService.php?acao=CreateNewUser`,
        {
            method: "POST",
            body: JSON.stringify({
                    nome: newNome,
                    email: newDescricao,
                    tipo: newTipo
                }
            )
        });
    const response = await request.json();
    console.log(response)
    return response
}

export async function validacaoLogin(
    newDescricao: string,
) {
    const request = await fetch(`${backendURL()}/UserService.php?acao=validacaoLogin`,
        {
            method: "POST",
            body: JSON.stringify({
                    descricao: newDescricao,
                }
            )
        });
    const response = await request.json();
    if (response != 0)
        await criarCookie("CookiCriado",response[0].id);
        await criarCookie("UserName",response[0].nome);
        await criarCookie("UserDescricao",response[0].descricao);
        await criarCookie("UserTipo", response[0].tipo);
    return response

}