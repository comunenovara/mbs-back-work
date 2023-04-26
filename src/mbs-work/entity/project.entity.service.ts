import { Injectable } from "@nestjs/common";
import { ProjectDto } from "../dto/project.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class ProjectEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertProject(projectDto: ProjectDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			name: projectDto.name,
		};
		// Relations
		return await this.prisma.project.create(prismaRequestArgs);
	}

	async updateProject(projectDto: ProjectDto) {
		return await this.prisma.project.update({
			where: {
				id: projectDto.id,
			},
			data: {
				name: projectDto.name,
			},
		});
	}

	// Get
	async getProjects(filters: any): Promise<ProjectDto[]> {
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
		return await this.prisma.project.findMany(prismaRequestArgs);
	}

	// Count
	async countProjects(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.project.count(prismaRequestArgs);
	}

	async getProject(id: number): Promise<ProjectDto> {
		return await this.prisma.project.findUnique({
			where: {
				id: id,
			},
		})
	}

	async deleteProject(id: number) {
		return await this.prisma.project.delete({
			where: {
				id: id,
			}
		});
	}
}