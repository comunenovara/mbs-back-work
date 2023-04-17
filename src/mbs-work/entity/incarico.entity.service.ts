import { Injectable } from "@nestjs/common";
import { IncaricoDto } from "../dto/incarico.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class IncaricoEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertIncarico(incaricoDto: IncaricoDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			name: incaricoDto.name,
		};
		// Relations
		return await this.prisma.incarico.create(prismaRequestArgs);
	}

	async updateIncarico(incaricoDto: IncaricoDto) {
		return await this.prisma.incarico.update({
			where: {
				id: incaricoDto.id,
			},
			data: {
				name: incaricoDto.name,
			},
		});
	}

	// Get
	async getIncaricos(filters: any): Promise<IncaricoDto[]> {
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
		return await this.prisma.incarico.findMany(prismaRequestArgs);
	}

	// Count
	async countIncaricos(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.incarico.count(prismaRequestArgs);
	}

	async getIncarico(id: number): Promise<IncaricoDto> {
		return await this.prisma.incarico.findUnique({
			where: {
				id: id,
			},
		})
	}

	async deleteIncarico(id: number) {
		return await this.prisma.incarico.delete({
			where: {
				id: id,
			}
		});
	}
}