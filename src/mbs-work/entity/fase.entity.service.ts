import { Injectable } from "@nestjs/common";
import { FaseDto } from "../dto/fase.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class FaseEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertFase(faseDto: FaseDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			name: faseDto.name,
		};
		// Relations
		return await this.prisma.fase.create(prismaRequestArgs);
	}

	async updateFase(faseDto: FaseDto) {
		return await this.prisma.fase.update({
			where: {
				id: faseDto.id,
			},
			data: {
				name: faseDto.name,
			},
		});
	}

	// Get
	async getFases(filters: any): Promise<FaseDto[]> {
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
		return await this.prisma.fase.findMany(prismaRequestArgs);
	}

	// Count
	async countFases(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.fase.count(prismaRequestArgs);
	}

	async getFase(id: number): Promise<FaseDto> {
		return await this.prisma.fase.findUnique({
			where: {
				id: id,
			},
		})
	}

	async deleteFase(id: number) {
		return await this.prisma.fase.delete({
			where: {
				id: id,
			}
		});
	}
}