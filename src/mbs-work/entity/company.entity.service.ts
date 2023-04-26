import { Injectable } from "@nestjs/common";
import { CompanyDto } from "../dto/company.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class CompanyEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertCompany(companyDto: CompanyDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			name: companyDto.name,
		};
		// Relations
		return await this.prisma.company.create(prismaRequestArgs);
	}

	async updateCompany(companyDto: CompanyDto) {
		return await this.prisma.company.update({
			where: {
				id: companyDto.id,
			},
			data: {
				name: companyDto.name,
			},
		});
	}

	// Get
	async getCompanies(filters: any): Promise<CompanyDto[]> {
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
		return await this.prisma.company.findMany(prismaRequestArgs);
	}

	// Count
	async countCompanies(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.company.count(prismaRequestArgs);
	}

	async getCompany(id: number): Promise<CompanyDto> {
		return await this.prisma.company.findUnique({
			where: {
				id: id,
			},
		})
	}

	async deleteCompany(id: number) {
		return await this.prisma.company.delete({
			where: {
				id: id,
			}
		});
	}
}