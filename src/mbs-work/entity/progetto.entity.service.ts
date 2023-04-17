import { Injectable } from "@nestjs/common";
import { ProgettoDto } from "../dto/progetto.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class ProgettoEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertProgetto(progettoDto: ProgettoDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			name: progettoDto.name,
		};
		// Relations
		return await this.prisma.progetto.create(prismaRequestArgs);
	}

	async updateProgetto(progettoDto: ProgettoDto) {
		return await this.prisma.progetto.update({
			where: {
				id: progettoDto.id,
			},
			data: {
				name: progettoDto.name,
			},
		});
	}

	// Get
	async getProgettos(filters: any): Promise<ProgettoDto[]> {
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
		return await this.prisma.progetto.findMany(prismaRequestArgs);
	}

	// Count
	async countProgettos(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.progetto.count(prismaRequestArgs);
	}

	async getProgetto(id: number): Promise<ProgettoDto> {
		return await this.prisma.progetto.findUnique({
			where: {
				id: id,
			},
		})
	}

	async deleteProgetto(id: number) {
		return await this.prisma.progetto.delete({
			where: {
				id: id,
			}
		});
	}
}