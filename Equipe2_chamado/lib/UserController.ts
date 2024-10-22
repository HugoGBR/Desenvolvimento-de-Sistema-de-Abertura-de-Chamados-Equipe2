import { backendURL } from "./URLS/backurl";
import React, { useState, useEffect } from "react";
import { insertMaskCpfCnpj, insertMaskTelefone } from "@/lib/MaskInputs/maskinput";
import { criarCookie, getCookie } from "./coockier";
import { updateClientByID } from "@/lib/CategoriaController";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/app/schemas/userschema";

type LoginFormSchema = z.infer<typeof userSchema>;


export async function createNewUser(
  newNome: string,
  newEmail: string,
  newTelefone: string,
  newTipo: string,
  newSenha: string
) {
  const response = await fetch(
    `${backendURL()}/UserService.php?acao=CreateNewUser`,
    {
      method: "POST",
      body: JSON.stringify({
        nome: newNome,
        email: newEmail,
        telefone: newTelefone,
        tipo: newTipo,
        Senha: newSenha,
      }),
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}


export async function getUserById(userId: number) {
  const response = await fetch(
    `${backendURL()}/backend/api/service/CategoriaService.php?userId=${userId}`
  );
  const dados = await response.json();
  console.log(dados);
  return dados;
}


export async function updateUserByID(
  newNome: string,
  newEmail: string,
  newTelefone: string,
  newSenha: string,
  paramsId: number
) {
  const response = await fetch(
    `${backendURL()}/backend/api/service/CategoriaService.php?userId=${paramsId}`,
    {
      method: "POST",
      body: JSON.stringify({
        nome: newNome,
        email: newEmail,
        telefone: newTelefone,
        Senha: newSenha,
      }),
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}


export async function validacaoLogin(newEmail: string, newSenha: string) {
  const response = await fetch(
    `${backendURL()}/UserService.php?acao=validacaoLogin`,
    {
      method: "POST",
      body: JSON.stringify({
        email: newEmail,
        senha: newSenha,
      }),
    }
  );
  const data = await response.json();
  if (data != 0) {
    await criarCookie("CookiCriado", data[0].id);
    await criarCookie("UserName", data[0].nome);
    await criarCookie("UserEmail", data[0].email);
    await criarCookie("UserTelefone", data[0].telefone);
    await criarCookie("UserTipo", data[0].tipo);
    await criarCookie("UserSenha", data[0].senha);
  }
  return data;
}


export function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(userSchema),
  });

  const [dadosCliente, setDadosCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    Senha: "",
  });

}
