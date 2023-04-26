import { Injectable } from "@nestjs/common";
import { WorkCategoryDto } from "../dto/work-category.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class WorkCategoryEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertWorkCategory(workCategoryDto: WorkCategoryDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			name: workCategoryDto.name,
		};
		// Relations
		return await this.prisma.workCategory.create(prismaRequestArgs);
	}

	async updateWorkCategory(workCategoryDto: WorkCategoryDto) {
		return await this.prisma.workCategory.update({
			where: {
				id: workCategoryDto.id,
			},
			data: {
				name: workCategoryDto.name,
			},
		});
	}

	// Get
	async getWorkCategories(filters: any): Promise<WorkCategoryDto[]> {
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
		return await this.prisma.workCategory.findMany(prismaRequestArgs);
	}

	// Count
	async countWorkCategories(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.workCategory.count(prismaRequestArgs);
	}

	async getWorkCategory(id: number): Promise<WorkCategoryDto> {
		return await this.prisma.workCategory.findUnique({
			where: {
				id: id,
			},
		})
	}

	async deleteWorkCategory(id: number) {
		return await this.prisma.workCategory.delete({
			where: {
				id: id,
			}
		});
	}
}