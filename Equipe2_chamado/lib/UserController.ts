import { backendURL } from "./URLS/backurl";
import {criarCookie, getCookie} from "./coockier";
export async function createNewUser(
    newNome: string,
    newEmail: string,
    newTelefone: string,
    newTipo: string,
    newSenha: string
) {
    const request = await fetch(`${backendURL()}/UserService.php?acao=CreateNewUser`,
        {
            method: "POST",
            body: JSON.stringify({
                    nome: newNome,
                    email: newEmail,
                    telefone: newTelefone,
                    tipo: newTipo,
                    senha: newSenha
                }
            )
        });
    const response = await request.json();
    console.log(response)
    return response
}

export async function validacaoLogin(
    newEmail: string,
    newSenha: string
) {
    const request = await fetch(`${backendURL()}/UserService.php?acao=validacaoLogin`,
        {
            method: "POST",
            body: JSON.stringify({
                    email: newEmail,
                    senha: newSenha
                }
            )
        });
    const response = await request.json();
    if (response != 0)
        await criarCookie("CookiCriado",response[0].id);
        await criarCookie("UserName",response[0].nome);
        await criarCookie("UserEmail",response[0].email);
        await criarCookie("UserTelefone",response[0].telefone);
        await criarCookie("UserTipo", response[0].tipo);
        await criarCookie("UserSenha",response[0].senha)
    return response

}