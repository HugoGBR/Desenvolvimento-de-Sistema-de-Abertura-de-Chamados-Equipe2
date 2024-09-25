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
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"





export default function Dashboard() {
	const { toast } = useToast()

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
																	<Select>
																		<SelectTrigger>
																			<SelectValue placeholder="Selecione a categoria" />
																		</SelectTrigger>
																		<SelectContent>
																			<SelectItem value="system">Sistema de gerenciamento de Comissões</SelectItem>{/*supostos nomes usar para puxar as categorias que cadastrarem no banco */}
																		</SelectContent>
																	</Select>
																	<Label htmlFor="role">Subcategoria</Label>
																	<Select>
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
																<Select>
																	<SelectTrigger >
																		<SelectValue className="text-opacity-50" placeholder="Selecione o status" />
																	</SelectTrigger>
																	<SelectContent >
																		<SelectItem value="Aberto">Aberto</SelectItem>{/*supostos nomes usar para puxar as categorias que cadastrarem no banco */}
																		<SelectItem value="Em-andamento">Em andamento</SelectItem>
																		<SelectItem value="Resolvido">Resolvido</SelectItem>
																		<SelectItem value="Fechado">Fechado</SelectItem>
																	</SelectContent>
																</Select>
																</div>
																<div className="grid gap-3">
																	<Label htmlFor="status">Prioridade</Label>
																	<Select>
																		<SelectTrigger >
																			<SelectValue placeholder="Selecione a prioridade" />
																		</SelectTrigger>
																		<SelectContent >
																			<SelectItem value="baixa">Baixa</SelectItem>{/*supostos nomes usar para puxar as categorias que cadastrarem no banco */}
																			<SelectItem value="media">Média</SelectItem>
																			<SelectItem value="alta">Alta</SelectItem>
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

															<Button className="bg-blue-700 shadow-md hover:bg-white hover:text-black shadow-blue-500 text-gray-50" type="button"
																variant="outline"
																onClick={() => {
																	toast({
																		description: "Chamado Finalizado",
																	})
																}}
															>
																Finalizar
															</Button>

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
