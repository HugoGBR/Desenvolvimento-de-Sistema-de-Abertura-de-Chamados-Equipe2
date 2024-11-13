"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { createNewSubcategoria, getAllCategorias } from "@/lib/CategoriaController";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Categoria = {
  id: number;
  nome: string;
};

export default function SubcategoriaCadastro() {
  const route = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [formData, setFormData] = useState({ nome: "", categoria_id: "" });

  // Carregar categorias ao montar o componente
  useEffect(() => {
    async function fetchCategorias() {
      try {
        const dados = await getAllCategorias();
        if (Array.isArray(dados)) {
          setCategorias(dados);
        } else {
          throw new Error("Formato de dados inválido.");
        }
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }
    fetchCategorias();
  }, []);

  const handleFormSubmit = async () => {
    try {
      const categoriaId = parseInt(formData.categoria_id);
      await createNewSubcategoria(categoriaId, formData.nome);
    } catch (error) {
      console.error("Erro ao cadastrar a Subcategoria:", error);
    } finally {
      route.push("/routes/home");  // Redireciona para a rota home
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form
        className="rounded-2xl shadow-xl shadow-blue-800 border-2 border-gray-400 p-10 gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
      >
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
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }}
              />

              <Label htmlFor="categoria_id">Categoria</Label>
              <select
                id="categoria_id"
                value={formData.categoria_id}
                onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
                style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }}
              >
                <option value="">Selecione uma Categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id.toString()}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
          <div style={{ marginTop: "40px" }}>
            <CardFooter className="justify-center flex">
              <button
                type="submit"
                style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}
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
