import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


export default function Home() {
  return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <form action="">
      <Card style={{ width: "400px", height: "600px" }}>
        <CardHeader>
          <CardTitle style={{textAlign: "center"}}>Cadastro Usuario</CardTitle>
        </CardHeader>
        <CardContent>
        <div 
            style={{ marginTop: "40px" }} 
        >
          <input 
              type="text" 
              placeholder="Nome do usuario" 
              style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }} 
            />
          <input 
              type="text" 
              placeholder="Email" 
              style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }} 
            />
          <input 
              type="text" 
              placeholder="Senha" 
              style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }} 
            />
          <input 
              type="tel" 
              placeholder="Telfelone" 
              style={{ padding: "8px", width: "100%", border: "2px solid #ccc", borderRadius: "4px", marginBottom: "20px" }} 
            />
          <h2>Cargo</h2>
          <RadioGroup defaultValue="option-one" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value='usuario' id="1" />
                  <Label htmlFor="option-one">Usuario</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value='suporte' id="2" />
                  <Label htmlFor="option-two">Suporte</Label>
                </div>
              </RadioGroup>

          </div>
        </CardContent>
        <div
        style={{ marginTop: "40px" }}
        >
          <CardFooter className="justify-center flex">
          <button style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px"}}>
            Cadastrar
          </button>
          </CardFooter>
        </div>
      </Card>
    </form>
  </div>
  );
}

