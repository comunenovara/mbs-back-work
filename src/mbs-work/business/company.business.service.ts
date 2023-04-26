import { Injectable } from "@nestjs/common";
import { CompanyDto } from "../dto/company.dto";
import { CompanyEntityService } from "../entity/company.entity.service";

@Injectable({})
export class CompanyBusinessService {
	constructor(
		private companyEntityService: CompanyEntityService,
	) {}

	async createCompany(companyDto: CompanyDto) {
		return this.companyEntityService.insertCompany(companyDto);
	}

	async editCompany(companyDto: CompanyDto) {
		return this.companyEntityService.updateCompany(companyDto);
	}

	async searchCompanies(filters: any): Promise<CompanyDto[]> {
		return this.companyEntityService.getCompanies(filters);
	}

	async countCompanies(filters: any): Promise<number> {
		return this.companyEntityService.countCompanies(filters);
	}

	async getCompany(id: number): Promise<CompanyDto> {
		return this.companyEntityService.getCompany(id);
	}

	async deleteCompany(id: number) {
		return this.companyEntityService.deleteCompany(id);
	}
}