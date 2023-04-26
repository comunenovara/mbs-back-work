import { Injectable } from "@nestjs/common";
import { RoleDto } from "../dto/role.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class RoleEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertRole(roleDto: RoleDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			name: roleDto.name,
			haveWorkCategory: roleDto.haveWorkCategory,
		};
		// Relations
		return await this.prisma.role.create(prismaRequestArgs);
	}

	async updateRole(roleDto: RoleDto) {
		return await this.prisma.role.update({
			where: {
				id: roleDto.id,
			},
			data: {
				name: roleDto.name,
				haveWorkCategory: roleDto.haveWorkCategory,
			},
		});
	}

	// Get
	async getRoles(filters: any): Promise<RoleDto[]> {
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
		return await this.prisma.role.findMany(prismaRequestArgs);
	}

	// Count
	async countRoles(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.role.count(prismaRequestArgs);
	}

	async getRole(id: number): Promise<RoleDto> {
		return await this.prisma.role.findUnique({
			where: {
				id: id,
			},
		})
	}

	async deleteRole(id: number) {
		return await this.prisma.role.delete({
			where: {
				id: id,
			}
		});
	}
}