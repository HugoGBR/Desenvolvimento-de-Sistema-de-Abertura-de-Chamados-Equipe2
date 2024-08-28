import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
                {/* Adicionando a imagem com link */}
                <Link href={'/routes/categoria/CadastroCategoria'}>
                  <img 
                    src="Equipe2_chamado/public/adicionar (1).png" 
                    alt="Descrição da imagem" 
                    style={{ width: "100%", height: "auto", marginBottom: "20px", cursor: "pointer" }} 
                  />
                </Link>

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

          {/* Segunda tabela */}
          <Card style={{ width: "250px", height: "500px" }}>
            <CardHeader>
              <CardTitle style={{ textAlign: "center" }}>Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ marginTop: "40px" }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]" style={{ textAlign: "center" }}>Outra Coluna</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium" style={{ textAlign: "center" }}>outro dado</TableCell>
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
