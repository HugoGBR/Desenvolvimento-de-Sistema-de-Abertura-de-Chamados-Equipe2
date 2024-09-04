"use client";
import { descricaoSchema } from "@/app/schemas/categoriaschema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createNewCategoria } from "@/lib/CategoriaController";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormSchema = z.infer<typeof descricaoSchema>;

export default function Home() {
  const route = useRouter();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<LoginFormSchema>({
    resolver: zodResolver(descricaoSchema)
  });

  const handleFormSubmit = async (data: LoginFormSchema) => {
    const { nome, descricao, tipo } = data;

    try {
      const response = await createNewCategoria(nome, descricao,tipo);
      if (response && response.id) {
        alert('Usuário cadastrado com sucesso!');
        route.push("/routes/cadastros");
      } else {
        throw new Error('Erro ao cadastrar o usuário.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar o usuário. Por favor, tente novamente.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form className="rounded-2xl shadow-xl shadow-blue-800 border-2 border-gray-400 p-10 gap-6" onSubmit={handleSubmit(handleFormSubmit)}>
        <Card style={{ width: "400px", height: "600px" }}>
          <CardHeader>
            <CardTitle style={{ textAlign: "center" }}>Cadastro Usuário</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ marginTop: "40px" }}>
              <Label htmlFor="nome">Nome</Label>
              <input
                id="nome"
                type="text"
                placeholder="Nome Categoria"
                {...register('nome')}
                style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }}
              />
              {errors.nome && <div style={{ color: "red" }}>{errors.nome.message}</div>}

              <Label htmlFor="descricao">Descrição</Label>
              <input
                id="descricao"
                type="text"
                placeholder=""
				className="min-h-[9.5rem]"
                {...register('descricao')}
                style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }}
              />
              {errors.descricao && <div style={{ color: "red" }}>{errors.descricao.message}</div>}

              <h2>Categoria</h2>
              <RadioGroup defaultValue="usuario" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value='usuario' id="1" {...register('tipo')} />
                  <Label htmlFor="1">Categoria</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value='suporte' id="2" {...register('tipo')} />
                  <Label htmlFor="2">Sub Categoria</Label>
                </div>
              </RadioGroup>
              {errors.tipo && <div style={{ color: "red" }}>{errors.tipo.message}</div>}
            </div>
          </CardContent>
          <div style={{ marginTop: "40px" }}>
            <CardFooter className="justify-center flex">
              <button
                type="submit"
                style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
                Cadastrar
              </button>
            </CardFooter>
          </div>
        </Card>
      </form>
    </div>
  );
}
