
import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  content: string
  status: "Aberto" | "Em andamento" | "Resolvido" | "Fechado"
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "content",
    header: "Descrição",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  
]
