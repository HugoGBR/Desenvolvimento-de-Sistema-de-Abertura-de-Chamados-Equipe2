import { z } from "zod";

export const descricaoSchema = z.object({
    nome: z.string().min(1, "Campo Obrigatório"),
    descricao: z.string().min(1, "Campo Obrigatório"),
    tipo: z.string().min(1, "Campo Obrigatório")

});