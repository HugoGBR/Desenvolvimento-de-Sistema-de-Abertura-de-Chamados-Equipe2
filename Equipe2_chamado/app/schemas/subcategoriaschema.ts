import { z } from "zod";

export const subcategoriaSchema = z.object({
    nome: z.string().min(1, "Campo Obrigatório"),
    categoria_id: z.string().min(1, "Campo Obrigatório")

});