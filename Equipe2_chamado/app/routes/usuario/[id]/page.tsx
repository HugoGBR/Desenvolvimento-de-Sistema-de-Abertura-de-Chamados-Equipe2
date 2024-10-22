"use client"
import { userSchema } from "@/app/schemas/userschema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createNewUser } from "@/lib/UserController";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getUserById, updateUserByID } from "@/lib/UserController";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertMaskTelefone } from "@/lib/MaskInputs/maskinput";

type LoginFormSchema = z.infer<typeof userSchema>;

export default function App({ params }: { params: { id: number } }) {
  const [dadosCliente, setDadosCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    Senha: "",
  });
  const route = useRouter();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<LoginFormSchema>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    const setDados = async () => {
      const usuario = await getUserById(params.id);
      setDadosCliente(usuario);

      setValue("telefone", insertMaskTelefone(usuario.telefone));
    };

    setDados();
  }, [params.id, setValue]);

  const handleTelefoneChange = (event: any) => {
    const { value } = event.target;
    const maskedValue = insertMaskTelefone(value);
    setValue("telefone", maskedValue);
    setDadosCliente({ ...dadosCliente, telefone: maskedValue });
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUserByID(
      dadosCliente.nome,
      dadosCliente.email,
      dadosCliente.telefone,
      dadosCliente.Senha,
      params.id
    );
    router.push("/routes/gestao");
  };

  const handleFormSubmit = async (data: LoginFormSchema) => {
    const { nome, email, telefone, tipo, senha } = data;

    try {
      const response = await createNewUser(nome, email, telefone, tipo, senha);
      if (response && response.id) {
        alert("Usuário cadastrado com sucesso!");
        route.push("/routes/cadastros");
      } else {
        throw new Error("Erro ao cadastrar o usuário.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar o usuário. Por favor, tente novamente.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        className="rounded-2xl shadow-xl shadow-blue-800 border-2 border-gray-400 p-10 gap-6"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Card style={{ width: "400px", height: "600px" }}>
          <CardHeader>
            <CardTitle style={{ textAlign: "center" }}>
              Cadastro Usuário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ marginTop: "40px" }}>
              <input
                type="text"
                placeholder="Nome do usuário"
                {...register("nome")}
                style={{
                  padding: "8px",
                  width: "100%",
                  border: "2px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  backgroundColor: "black",
                  color: "white",
                }}
              />
              {errors.nome && (
                <div style={{ color: "red" }}>{errors.nome.message}</div>
              )}

              <input
                type="text"
                placeholder="Email"
                {...register("email")}
                style={{
                  padding: "8px",
                  width: "100%",
                  border: "2px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  backgroundColor: "black",
                  color: "white",
                }}
              />
              {errors.email && (
                <div style={{ color: "red" }}>{errors.email.message}</div>
              )}

              <input
                type="password"
                placeholder="Senha"
                {...register("senha")}
                style={{
                  padding: "8px",
                  width: "100%",
                  border: "2px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  backgroundColor: "black",
                  color: "white",
                }}
              />
              {errors.senha && (
                <div style={{ color: "red" }}>{errors.senha.message}</div>
              )}
              <div className="flex flex-col space-y-1.5">
                <input
                  type="text"
                  className={`border-b-2 focus:border-b-2 ${
                    errors.telefone ? "border-red-500" : ""
                  }`}
                  placeholder="Telefone"
                  {...register("telefone")}
                  style={{
                    padding: "8px",
                    width: "100%",
                    border: "2px solid #ccc",
                    borderRadius: "4px",
                    marginBottom: "20px",
                    backgroundColor: "black",
                    color: "white",
                  }}
                  onChange={handleTelefoneChange}
                />
                {errors.telefone && (
                  <div className="text-red-500">{errors.telefone.message}</div>
                )}
              </div>
              {errors.telefone && (
                <div style={{ color: "red" }}>{errors.telefone.message}</div>
              )}

              <h2>Cargo</h2>
              <RadioGroup
                defaultValue="usuario"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "10px",
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="usuario"
                    id="1"
                    {...register("tipo")}
                  />
                  <Label htmlFor="1">Usuário</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="suporte"
                    id="2"
                    {...register("tipo")}
                  />
                  <Label htmlFor="2">Suporte</Label>
                </div>
              </RadioGroup>
              {errors.tipo && (
                <div style={{ color: "red" }}>{errors.tipo.message}</div>
              )}
            </div>
          </CardContent>
          <div style={{ marginTop: "40px" }}>
            <CardFooter className="justify-center flex">
              <button
                type="submit"
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Cadastrar
              </button>
            </CardFooter>
          </div>
        </Card>
      </form>
    </div>
  );
}
