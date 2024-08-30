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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createNewUser } from "@/lib/UserController";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormSchema = z.infer<typeof userSchema>;

export default function Home() {
  const route = useRouter();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<LoginFormSchema>({
    resolver: zodResolver(userSchema)
  });

  const handleFormSubmit = async (data: LoginFormSchema) => {
    const { nome, email, telefone, tipo, senha } = data;

    try {
        const response = await createNewUser(nome, email, telefone, tipo, senha);
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
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Card style={{ width: "400px", height: "600px" }}>
          <CardHeader>
            <CardTitle style={{ textAlign: "center" }}>Cadastro Usuário</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ marginTop: "40px" }}>
              <input
                type="text"
                placeholder="Nome do usuário"
                {...register('nome')}
                style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }}
              />
              {errors.nome && <div style={{ color: "red" }}>{errors.nome.message}</div>}

              <input
                type="text"
                placeholder="Email"
                {...register('email')}
                style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }}
              />
              {errors.email && <div style={{ color: "red" }}>{errors.email.message}</div>}

              <input
                type="password"
                placeholder="Senha"
                {...register('senha')}
                style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }}
              />
              {errors.senha && <div style={{ color: "red" }}>{errors.senha.message}</div>}

              <input
                type="tel"
                placeholder="Telefone"
                {...register('telefone')}
                style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }}
              />
              {errors.telefone && <div style={{ color: "red" }}>{errors.telefone.message}</div>}

              <h2>Cargo</h2>
              <RadioGroup defaultValue="usuario" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value='usuario' id="1" {...register('tipo')} />
                  <Label htmlFor="1">Usuário</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value='suporte' id="2" {...register('tipo')} />
                  <Label htmlFor="2">Suporte</Label>
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
