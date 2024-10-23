"use client";
import { subcategoriaSchema } from "@/app/schemas/subcategoriaschema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { createNewSubcategoria } from "@/lib/SubcategoriaController";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SubcategoriaFormSchema = z.infer<typeof subcategoriaSchema>;

export default function SubcategoriaCadastro() {
  const route = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<SubcategoriaFormSchema>({
    resolver: zodResolver(subcategoriaSchema)
  });

  const handleFormSubmit = async (data: SubcategoriaFormSchema) => {
    const { nome, categoria_id } = data;

    try {
      const response = await createNewSubcategoria(nome, categoria_id);
      if (response && response.id) {
        alert('Subcategoria cadastrada com sucesso!');
        route.push("/routes/subcategorias");
      } else {
        throw new Error('Erro ao cadastrar a subcategoria.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar a subcategoria. Por favor, tente novamente.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form className="rounded-2xl shadow-xl shadow-blue-800 border-2 border-gray-400 p-10 gap-6" onSubmit={handleSubmit(handleFormSubmit)}>
        <Card style={{ width: "400px", height: "500px" }}>
          <CardHeader>
            <CardTitle style={{ textAlign: "center" }}>Cadastro Subcategoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ marginTop: "40px" }}>
              <Label htmlFor="nome">Nome</Label>
              <input
                id="nome"
                type="text"
                placeholder="Nome da Subcategoria"
                {...register('nome')}
                style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }}
              />
              {errors.nome && <div style={{ color: "red" }}>{errors.nome.message}</div>}

              <Label htmlFor="categoria_id">Categoria</Label>
              <input
                id="categoria_id"
                type="number"
                placeholder="ID da Categoria"
                {...register('categoria_id')}
                style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }}
              />
              {errors.categoria_id && <div style={{ color: "red" }}>{errors.categoria_id.message}</div>}
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
