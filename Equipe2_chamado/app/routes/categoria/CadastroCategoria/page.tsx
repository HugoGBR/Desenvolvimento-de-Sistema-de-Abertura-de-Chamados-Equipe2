'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    CardFooter,
  } from "@/components/ui/card";

export default function Dashboard() {
	return (
		<div>
			<div className="grid h-screen w-full">
				<div className="flex flex-col">
					<main className="grid flex-1 gap-4 overflow-auto justify-center items-center p-4">
						<div className="flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0">
							<form className="grid w-full items-start rounded-2xl shadow-xl shadow-blue-800 border-2 border-gray-400 p-10 gap-6">

								<div className="grid gap-3">
									<div className="text-center font-bold text-2xl pb-6">Cadastro Categoria</div>
								</div>
								<div className="grid gap-3">
									<Label htmlFor="usuario">Nome Categoria</Label>
									<Input id="usuario" type="text" placeholder="Aqui vai aparecer o nome do autor do chamado" />
								</div>
								<div className="grid gap-3">
									<Label htmlFor="content">Descrição</Label>
									<Textarea
										id="content"
										placeholder="Aqui vai aparecer a descrição do problema relatado pelo usuário"
										className="min-h-[9.5rem]"
									/>
								</div>
                                <CardFooter className="justify-center flex">
              <button
                type="submit"
                style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
                Cadastrar
              </button>
            </CardFooter>
							</form>
						</div>
					</main>
				</div>
			</div>
		</div>

	)
}
