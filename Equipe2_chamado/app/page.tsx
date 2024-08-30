'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { loginSchema } from "./schemas/loginshemas";
import { validacaoLogin } from "@/lib/UserController";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type LoginFormSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema)
  });

  const handleFormSubmit = async (data: LoginFormSchema) => {
    const autenticado = await validacaoLogin(data.user,data.password)
    if (autenticado !=0){
        router.push('routes/home');
    }else{
        alert("Usuario não encontrado")
    }
};

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card className="w-full border-2 border-gray-400 shadow-xl shadow-blue-800 rounded-2xl max-w-sm">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Faça o login para acessar a sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                {...register("user")} 
              />
              {errors.user && <span style={{ color: 'red' }}>{errors.user.message}</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Senha" 
                {...register("password")} 
              />
              {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }} className="w-full">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
