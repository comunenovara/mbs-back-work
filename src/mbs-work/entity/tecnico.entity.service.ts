import { Injectable } from "@nestjs/common";
import { TecnicoDto } from "../dto/tecnico.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class TecnicoEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertTecnico(tecnicoDto: TecnicoDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			name: tecnicoDto.name,
		};
		// Relations
		return await this.prisma.tecnico.create(prismaRequestArgs);
	}

	async updateTecnico(tecnicoDto: TecnicoDto) {
		return await this.prisma.tecnico.update({
			where: {
				id: tecnicoDto.id,
			},
			data: {
				name: tecnicoDto.name,
			},
		});
	}

	// Get
	async getTecnicos(filters: any): Promise<TecnicoDto[]> {
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
		return await this.prisma.tecnico.findMany(prismaRequestArgs);
	}

	// Count
	async countTecnicos(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.tecnico.count(prismaRequestArgs);
	}

	async getTecnico(id: number): Promise<TecnicoDto> {
		return await this.prisma.tecnico.findUnique({
			where: {
				id: id,
			},
		})
	}

	async deleteTecnico(id: number) {
		return await this.prisma.tecnico.delete({
			where: {
				id: id,
			}
		});
	}
}