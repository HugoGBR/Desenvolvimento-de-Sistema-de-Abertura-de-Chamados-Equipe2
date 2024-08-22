'use client'
import {
	CornerDownLeft, Settings
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


export default function Dashboard() {
	return (
		<div>
			<div className="grid h-screen w-full pl-[56px]">
				<div className="flex flex-col">
					<header className="sticky top-0 z-10 flex h-[57px] justify-center items-center gap-1 border-b bg-background px-4">
						<h1 className="text-xl font-semibold">Chamado</h1>
						<Drawer>
							<DrawerTrigger asChild>
								<Button variant="ghost" size="icon" className="md:hidden">
									<Settings className="size-4" />
									<span className="sr-only">Settings</span>
								</Button>
							</DrawerTrigger>
							<DrawerContent className="max-h-[80vh]">
								<DrawerHeader>
									<DrawerTitle>Configuration</DrawerTitle>
									<DrawerDescription>
										Configure the settings for the model and messages.
									</DrawerDescription>
								</DrawerHeader>
								<form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
									<fieldset className="grid gap-6 rounded-lg border p-4">
										<legend className="-ml-1 px-1 text-sm font-medium">
											Settings
										</legend>

										<div className="grid gap-3">
											<Label htmlFor="temperature">Temperature</Label>
											<Input id="temperature" type="number" placeholder="0.4" />
										</div>
										<div className="grid gap-3">
											<Label htmlFor="top-p">Top P</Label>
											<Input id="top-p" type="number" placeholder="0.7" />
										</div>
										<div className="grid gap-3">
											<Label htmlFor="top-k">Top K</Label>
											<Input id="top-k" type="number" placeholder="0.0" />
										</div>
									</fieldset>
									<fieldset className="grid gap-6 rounded-lg border p-4">
										<legend className="-ml-1 px-1 text-sm font-medium">
											Messages
										</legend>
										<div className="grid gap-3">
											<Label htmlFor="role">Role</Label>
											<Select defaultValue="system">
												<SelectTrigger>
													<SelectValue placeholder="Select a role" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="system">System</SelectItem>
													<SelectItem value="user">User</SelectItem>
													<SelectItem value="assistant">Assistant</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="content">Content</Label>
											<Textarea id="content" placeholder="You are a..." />
										</div>
									</fieldset>
								</form>
							</DrawerContent>
						</Drawer>
					</header>
					<main className="grid flex-1 gap-4 overflow-auto justify-center items-center p-4">
						<div className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0">
							<form className="grid w-full items-start rounded-3xl shadow-xl shadow-blue-800 border-2 border-gray-400 p-10 gap-6">

								<div className="grid gap-3">
									<Select>
										<Label htmlFor="role">Categoria</Label>
										<Select defaultValue="system">
											<SelectTrigger>
												<SelectValue placeholder="Selecione a categoria" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="system">Sistema de gerenciamento de Comissões</SelectItem>{/*supostos nomes usar para puxar as categorias que cadastrarem no banco */}
											</SelectContent>
										</Select>
										<Label htmlFor="role">Subcategoria</Label>
										<Select defaultValue="system">
											<SelectTrigger>
												<SelectValue placeholder="Selecione a subcategoria" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="home">Home</SelectItem>{/*supostos nomes usar para puxar as categorias que cadastrarem no banco */}
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
									<Input id="usuario" type="text" placeholder="Aqui vai aparecer o nome do autor do chamado" />
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="grid gap-3">
										<Label htmlFor="status">Status</Label>
										<Input id="status" type="text" placeholder='Aberto/Em andamento/Resolvido/Fechado' />
									</div>
									<div className="grid gap-3">
										<Label htmlFor="prioridade">Prioridade</Label>
										<Input id="prioridade" type="text" placeholder="Baixa/ Média/ Alta" />
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
							</form>
						</div>

					</main>
				</div>
			</div>
		</div>

	)
}
