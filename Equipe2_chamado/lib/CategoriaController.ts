import { backendURL } from "./URLS/backurl";
import { criarCookie } from "./coockier";

export async function createNewCategoria(
  newNome: string,
  newDescricao: string,
  newTipo: string
) {
  const request = await fetch(`${backendURL()}/CategoriaService.php?acao=CreateNewCategoria`, // Endpoint alterado
    {
      method: "POST",
      body: JSON.stringify({
        nome: newNome,
        descricao: newDescricao,  // Correção aqui
        tipo: newTipo
      }),
    });

  const response = await request.json();
  console.log(response);
  return response;
}
export async function updateClientByID(newNome: string, newEmail: string, newTelefone: string, newSenha: string, paramsId: number) {
  const request = await fetch(`${backendURL()}/ClienteService.php?acao=updateClientByID&id=${paramsId}`, {
      method: "POST",
      body: JSON.stringify({nome: newNome, email: newEmail, telefone: newTelefone, cpf_cnpj: newSenha})
  });
  const response = await request.json();
  console.log(response)
  return response
}
export async function validacaoLogin(newDescricao: string) {
  const request = await fetch(`${backendURL()}/UserService.php?acao=validacaoLogin`,
    {
      method: "POST",
      body: JSON.stringify({
        descricao: newDescricao,
      }),
    });

  const response = await request.json();
  
  if (response && response.length > 0) {  // Verificação corrigida
    await criarCookie("CookiCriado", response[0].id);
    await criarCookie("UserName", response[0].nome);
    await criarCookie("UserDescricao", response[0].descricao);
    await criarCookie("UserTipo", response[0].tipo);
  }

  return response;
}
