import { z } from "zod";

export const userSchema = z.object({
    nome: z.string().min(1, "Campo Obrigatório"),
    email: z.string().min(1, "Campo Obrigatório"),
    telefone: z.string().min(1,"Campo Obrigatório"),
    tipo: z.string().min(1, "Campo Obrigatório"),
    senha: z.string().min(1, "Campo Obrigatório")
});
