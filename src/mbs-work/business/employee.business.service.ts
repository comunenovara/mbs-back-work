import { Injectable } from "@nestjs/common";
import { EmployeeDto } from "../dto/employee.dto";
import { EmployeeEntityService } from "../entity/employee.entity.service";

@Injectable({})
export class EmployeeBusinessService {
	constructor(
		private employeeEntityService: EmployeeEntityService,
	) {}

	async createEmployee(employeeDto: EmployeeDto) {
		return this.employeeEntityService.insertEmployee(employeeDto);
	}

	async editEmployee(employeeDto: EmployeeDto) {
		return this.employeeEntityService.updateEmployee(employeeDto);
	}

	async searchEmployees(filters: any): Promise<EmployeeDto[]> {
		return this.employeeEntityService.getEmployees(filters);
	}

	async countEmployees(filters: any): Promise<number> {
		return this.employeeEntityService.countEmployees(filters);
	}

	async getEmployee(id: number): Promise<EmployeeDto> {
		return this.employeeEntityService.getEmployee(id);
	}

	async deleteEmployee(id: number) {
		return this.employeeEntityService.deleteEmployee(id);
	}
}