import { Injectable } from "@nestjs/common";
import { AssignementDto } from "../dto/assignement.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class AssignementEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertAssignement(assignementDto: AssignementDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			external: assignementDto.external,
		};
		// Relations
		if(assignementDto.projectId != null) {
			prismaRequestArgs['data']['project'] = {
				connect: {
					id: assignementDto.projectId
				}
			};
		}
		if(assignementDto.roleId != null) {
			prismaRequestArgs['data']['role'] = {
				connect: {
					id: assignementDto.roleId
				}
			};
		}
		if(assignementDto.workCategoryId != null) {
			prismaRequestArgs['data']['workCategory'] = {
				connect: {
					id: assignementDto.workCategoryId
				}
			};
		}
		if(assignementDto.employeeId != null) {
			prismaRequestArgs['data']['employee'] = {
				connect: {
					id: assignementDto.employeeId
				}
			};
		}
		if(assignementDto.companyId != null) {
			prismaRequestArgs['data']['company'] = {
				connect: {
					id: assignementDto.companyId
				}
			};
		}
		return await this.prisma.assignement.create(prismaRequestArgs);
	}

	async updateAssignement(assignementDto: AssignementDto) {
		return await this.prisma.assignement.update({
			where: {
				id: assignementDto.id,
			},
			data: {
				projectId: assignementDto.projectId,
				roleId: assignementDto.roleId,
				workCategoryId: assignementDto.workCategoryId,
				employeeId: assignementDto.employeeId,
				companyId: assignementDto.companyId,
				external: assignementDto.external,
			},
		});
	}

	// Get
	async getAssignements(filters: any): Promise<AssignementDto[]> {
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
				project: true,
				role: true,
				workCategory: true,
				employee: true,
				company: true,
			};
		}
		// Order
		if(filters.orderBy !== undefined) {
			prismaRequestArgs['orderBy'] = QueryParamsTools.getPrismaOrderByArray(filters);
		}
		return await this.prisma.assignement.findMany(prismaRequestArgs);
	}

	// Count
	async countAssignements(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.assignement.count(prismaRequestArgs);
	}

	async getAssignement(id: number): Promise<AssignementDto> {
		return await this.prisma.assignement.findUnique({
			where: {
				id: id,
			},
			include: {
				project: true,
				role: true,
				workCategory: true,
				employee: true,
				company: true,
			},
		})
	}

	async deleteAssignement(id: number) {
		return await this.prisma.assignement.delete({
			where: {
				id: id,
			}
		});
	}
}