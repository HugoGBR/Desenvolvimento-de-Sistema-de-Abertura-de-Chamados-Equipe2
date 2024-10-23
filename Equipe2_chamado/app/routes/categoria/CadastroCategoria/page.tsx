"use client";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { createNewCategoria } from "@/lib/CategoriaController";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// Validação do schema usando Zod
const categoriaSchema = z.object({
  nome: z.string().min(1, { message: "O nome da categoria é obrigatório" }),
});

type CategoriaFormSchema = z.infer<typeof categoriaSchema>;

export default function CategoriaCadastro() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<CategoriaFormSchema>({
    resolver: zodResolver(categoriaSchema)
  });

  const handleFormSubmit = async (data: CategoriaFormSchema) => {
    const { nome } = data;

    try {
      await createNewCategoria(nome); // Cadastro realizado
      router.push("/routes/home"); // Redireciona após sucesso
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar a categoria. Por favor, tente novamente.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form className="rounded-2xl shadow-xl shadow-blue-800 border-2 border-gray-400 p-10 gap-6" onSubmit={handleSubmit(handleFormSubmit)}>
        <Card style={{ width: "400px", height: "400px" }}>
          <CardHeader>
            <CardTitle style={{ textAlign: "center" }}>Cadastro de Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ marginTop: "40px" }}>
              <Label htmlFor="nome">Nome da Categoria</Label>
              <input
                id="nome"
                type="text"
                placeholder="Digite o nome da categoria"
                {...register('nome')}
                style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }}
              />
              {errors.nome && <div style={{ color: "red" }}>{errors.nome.message}</div>}
            </div>
          </CardContent>
          <CardFooter className="justify-center flex" style={{ marginTop: "40px" }}>
            <button
              type="submit"
              style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
              Cadastrar
            </button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
