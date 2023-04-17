import { Injectable } from "@nestjs/common";
import { NominaDto } from "../dto/nomina.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class NominaEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertNomina(nominaDto: NominaDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			ie: nominaDto.ie,
		};
		// Relations
		if(nominaDto.pncaricoId != null) {
			prismaRequestArgs['data']['pncarico'] = {
				connect: {
					id: nominaDto.pncaricoId
				}
			};
		}
		if(nominaDto.faseId != null) {
			prismaRequestArgs['data']['fase'] = {
				connect: {
					id: nominaDto.faseId
				}
			};
		}
		if(nominaDto.progettoId != null) {
			prismaRequestArgs['data']['progetto'] = {
				connect: {
					id: nominaDto.progettoId
				}
			};
		}
		if(nominaDto.nominaId != null) {
			prismaRequestArgs['data']['nomina'] = {
				connect: {
					id: nominaDto.nominaId
				}
			};
		}
		if(nominaDto.aziendaId != null) {
			prismaRequestArgs['data']['azienda'] = {
				connect: {
					id: nominaDto.aziendaId
				}
			};
		}
		return await this.prisma.nomina.create(prismaRequestArgs);
	}

	async updateNomina(nominaDto: NominaDto) {
		return await this.prisma.nomina.update({
			where: {
				id: nominaDto.id,
			},
			data: {
				pncaricoId: nominaDto.pncaricoId,
				faseId: nominaDto.faseId,
				progettoId: nominaDto.progettoId,
				nominaId: nominaDto.nominaId,
				aziendaId: nominaDto.aziendaId,
				ie: nominaDto.ie,
			},
		});
	}

	// Get
	async getNominas(filters: any): Promise<NominaDto[]> {
		let prismaRequestArgs: any = {};
		// Pagination
		if(filters.size !== undefined && filters.page !== undefined) {
			prismaRequestArgs = { ...QueryParamsTools.getPrismaPaginationObject(filters) };
		}
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		// Join
		{
			prismaRequestArgs['include'] = {
				pncarico: true,
				fase: true,
				progetto: true,
				nomina: true,
				azienda: true,
			};
		}
		// Order
		if(filters.orderBy !== undefined) {
			prismaRequestArgs['orderBy'] = QueryParamsTools.getPrismaOrderByArray(filters);
		}
		return await this.prisma.nomina.findMany(prismaRequestArgs);
	}

	// Count
	async countNominas(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.nomina.count(prismaRequestArgs);
	}

	async getNomina(id: number): Promise<NominaDto> {
		return await this.prisma.nomina.findUnique({
			where: {
				id: id,
			},
			include: {
				pncarico: true,
				fase: true,
				progetto: true,
				nomina: true,
				azienda: true,
			},
		})
	}

	async deleteNomina(id: number) {
		return await this.prisma.nomina.delete({
			where: {
				id: id,
			}
		});
	}
}