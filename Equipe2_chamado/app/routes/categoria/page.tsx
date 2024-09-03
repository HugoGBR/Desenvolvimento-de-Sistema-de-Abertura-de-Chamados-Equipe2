import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form action="">
        <div style={{ display: 'flex', gap: '20px' }}>
          <Card style={{ width: "400px", height: "600px" }}>
            <CardHeader>
              <CardTitle style={{ textAlign: "center" }}>Cadastro Usuario</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div style={{ marginTop: "40px" }}>
              <HoveredLink href="/routes/categoria/CadastroCategoria">Chamados</HoveredLink>

                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="max-w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:border-blue-500"
                />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]" style={{ textAlign: "center" }}>Nome</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium" style={{ textAlign: "center" }}>nome da categoria</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </form>
    </div>
  );
}
