import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  export default function Home() {
    return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form action="">
        <Card style={{ width: "300px", height: "300px" }}>
          <CardHeader>
            <CardTitle>Cadastro Usuario</CardTitle>
          </CardHeader>
          <CardContent>
          <input 
              type="text" 
              placeholder="Nome do usuario" 
              style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "10px" }} 
            />
          <input 
              type="text" 
              placeholder="Email" 
              style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "10px" }} 
            />
            <input 
              type="text" 
              placeholder="Senha" 
              style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px" }} 
            />
          </CardContent>
          <CardFooter>
          <button style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
            Cadastrar
          </button>
          </CardFooter>
        </Card>
      </form>
    </div>
    );
  }
  
