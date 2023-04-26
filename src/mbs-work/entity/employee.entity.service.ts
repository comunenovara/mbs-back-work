import { Injectable } from "@nestjs/common";
import { EmployeeDto } from "../dto/employee.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class EmployeeEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertEmployee(employeeDto: EmployeeDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			name: employeeDto.name,
		};
		// Relations
		return await this.prisma.employee.create(prismaRequestArgs);
	}

	async updateEmployee(employeeDto: EmployeeDto) {
		return await this.prisma.employee.update({
			where: {
				id: employeeDto.id,
			},
			data: {
				name: employeeDto.name,
			},
		});
	}

	// Get
	async getEmployees(filters: any): Promise<EmployeeDto[]> {
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
		return await this.prisma.employee.findMany(prismaRequestArgs);
	}

	// Count
	async countEmployees(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.employee.count(prismaRequestArgs);
	}

	async getEmployee(id: number): Promise<EmployeeDto> {
		return await this.prisma.employee.findUnique({
			where: {
				id: id,
			},
		})
	}

	async deleteEmployee(id: number) {
		return await this.prisma.employee.delete({
			where: {
				id: id,
			}
		});
	}
}