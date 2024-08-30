'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"


export default function Dashboard() {
	return (
		<div>
			<div className="grid h-screen w-full text-4xl font-semibold">
				<div className="flex flex-col">
					<main className="grid flex-1 gap-4 overflow-auto justify-center items-center p-4">
						<div className="flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0">
							<Carousel className="w-full max-w-2xl">
								<CarouselContent>
									{Array.from({ length: 5 }).map((_, index) => (
										<CarouselItem key={index}>
											<div className="p-1">
												<Card>
													<CardContent className="flex aspect-square items-center justify-center p-6">
														<form className="grid items-start rounded-2xl shadow-xl shadow-blue-800 border-2 border-gray-400 p-10 gap-6">
															<div className="grid gap-3">
																<div className="text-center font-bold text-2xl pb-6">Resolver Chamado</div>
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
													</CardContent>
												</Card>
											</div>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious />
								<CarouselNext />
							</Carousel>

						</div>

					</main>
				</div>
			</div>


		</div>

	)
}
