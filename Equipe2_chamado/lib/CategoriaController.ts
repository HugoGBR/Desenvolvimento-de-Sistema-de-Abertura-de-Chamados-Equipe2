import { backendURL } from "./URLS/backurl";
import { criarCookie } from "./coockier";

export async function createNewCategoria(
  newNome: string
) {
  try {
    const request = await fetch(`${backendURL()}/CategoriaService.php?acao=CreateNewCategoria`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"  // Definir o Content-Type
      },
      body: JSON.stringify({
        nome: newNome
      }),
    });

    if (!request.ok) {
      throw new Error(`Erro: ${request.status} - ${request.statusText}`);
    }

    const response = await request.json();
    console.log(response);
    return response;
  } catch (error) {
    console.error("Erro ao cadastrar a categoria:", error);
    throw error;  // Lança o erro para ser tratado onde o método é chamado
  }
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


export async function createNewSubcategoria(categoria_id: number, nome: string) {
  try {
    const response = await fetch('http://localhost/Desenvolvimento-de-Sistema-de-Abertura-de-Chamados-Equipe2/backend/api/service/SubcategoriaService.php?acao=CreateNewSubcategoria', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoria_id, nome }),
    });

    // Log do conteúdo da resposta para verificar
    const contentType = response.headers.get("content-type");
    const responseText = await response.text();
    console.log("Conteúdo da resposta:", responseText);

    // Verifica se a resposta é JSON
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Resposta do servidor não é JSON");
    }

    // Retorna como JSON se o tipo for válido
    return JSON.parse(responseText);

  } catch (error) {
    console.error("Erro ao cadastrar a Subcategoria:", error);
    throw error;
  }
}


export async function getAllCategorias() {
  const response = await fetch(
    "http://localhost/Desenvolvimento-de-Sistema-de-Abertura-de-Chamados-Equipe2/backend/api/service/CategoriaService.php?acao=getAllCategorias"
  );
  const dados = await response.json();
  console.log(dados);
  return dados;
}
