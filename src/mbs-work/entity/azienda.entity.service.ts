import { Injectable } from "@nestjs/common";
import { AziendaDto } from "../dto/azienda.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class AziendaEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertAzienda(aziendaDto: AziendaDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			name: aziendaDto.name,
		};
		// Relations
		return await this.prisma.azienda.create(prismaRequestArgs);
	}

	async updateAzienda(aziendaDto: AziendaDto) {
		return await this.prisma.azienda.update({
			where: {
				id: aziendaDto.id,
			},
			data: {
				name: aziendaDto.name,
			},
		});
	}

	// Get
	async getAziendas(filters: any): Promise<AziendaDto[]> {
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
		}
		// Order
		if(filters.orderBy !== undefined) {
			prismaRequestArgs['orderBy'] = QueryParamsTools.getPrismaOrderByArray(filters);
		}
		return await this.prisma.azienda.findMany(prismaRequestArgs);
	}

	// Count
	async countAziendas(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.azienda.count(prismaRequestArgs);
	}

	async getAzienda(id: number): Promise<AziendaDto> {
		return await this.prisma.azienda.findUnique({
			where: {
				id: id,
			},
		})
	}

	async deleteAzienda(id: number) {
		return await this.prisma.azienda.delete({
			where: {
				id: id,
			}
		});
	}
}