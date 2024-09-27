'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


export default function Dashboard() {
	return (
		<div>
			<div className="grid h-screen w-full">
				<div className="flex flex-col">
					<main className="grid flex-1 gap-4 overflow-auto justify-center items-center p-4">
						<div className="flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0">
							<form className="grid w-[800px] items-start rounded-2xl shadow-xl shadow-blue-800 border-2 border-gray-400 p-10 gap-6">

								<div className="grid gap-3">
									<div className="text-center font-bold text-2xl pb-6">Chamados</div>
									<Select>
										<Label htmlFor="role">Categoria</Label>
										<Select>
											<SelectTrigger>
												<SelectValue placeholder="Selecione a categoria" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="system">Sistema de gerenciamento de Comissões</SelectItem>
											</SelectContent>
										</Select>
										<Label htmlFor="role">Subcategoria</Label>
										<Select>
											<SelectTrigger>
												<SelectValue placeholder="Selecione a subcategoria" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="home">Home</SelectItem>
												<SelectItem value="cadastro">Cadastro</SelectItem>
												<SelectItem value="relatorio">Relatório</SelectItem>
												<SelectItem value="financeiro">Financeiro</SelectItem>
												<SelectItem value="ajustes">Ajustes</SelectItem>
												<SelectItem value="perfil">Perfil</SelectItem>
											</SelectContent>
										</Select>
										<SelectContent>
											<SelectItem value="genesis">
												<div className="flex items-start gap-3 text-muted-foreground">
													<div className="grid gap-0.5">
													</div>
												</div>
											</SelectItem>
											<SelectItem value="explorer">
												<div className="flex items-start gap-3 text-muted-foreground">
													<div className="grid gap-0.5">
													</div>
												</div>
											</SelectItem>
											<SelectItem value="quantum">
												<div className="flex items-start gap-3 text-muted-foreground">
													<div className="grid gap-0.5">
													</div>	
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="grid gap-3">
									<Label htmlFor="usuario">Usuário</Label>
									<Input id="usuario" type="text" placeholder="Nome do autor do chamado" />
								</div>
								<div className="grid gap-4">
									<div className="grid gap-3 w-auto">
										<Label htmlFor="prioridade">Prioridade</Label>
										<Select>
											<SelectTrigger>
												<SelectValue placeholder="Selecione a prioridade" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Baixa">Baixa</SelectItem>
												<SelectItem value="Média">Média</SelectItem>
												<SelectItem value="Alta">Alta</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className="grid gap-3">
									<Label htmlFor="content">Descrição</Label>
									<Textarea
										id="content"
										placeholder="Aqui vai aparecer a descrição do problema relatado pelo usuário"
										className="min-h-[9.5rem]"
									/>
								</div>
								<div className="justify-center flex pt-2">
									<Button type="submit"className="w-full bg-blue-700 shadow-md hover:bg-white hover:text-black shadow-blue-500 text-gray-50">
										Cadastre
									</Button>
								</div>
							</form>
						</div>

					</main>
				</div>
			</div>
		</div>

	)
}
