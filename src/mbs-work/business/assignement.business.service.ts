import { Injectable } from "@nestjs/common";
import { AssignementDto } from "../dto/assignement.dto";
import { AssignementEntityService } from "../entity/assignement.entity.service";

@Injectable({})
export class AssignementBusinessService {
	constructor(
		private assignementEntityService: AssignementEntityService,
	) {}

	async createAssignement(assignementDto: AssignementDto) {
		return this.assignementEntityService.insertAssignement(assignementDto);
	}

	async editAssignement(assignementDto: AssignementDto) {
		return this.assignementEntityService.updateAssignement(assignementDto);
	}

	async searchAssignements(filters: any): Promise<AssignementDto[]> {
		return this.assignementEntityService.getAssignements(filters);
	}

	async countAssignements(filters: any): Promise<number> {
		return this.assignementEntityService.countAssignements(filters);
	}

	async getAssignement(id: number): Promise<AssignementDto> {
		return this.assignementEntityService.getAssignement(id);
	}

	async deleteAssignement(id: number) {
		return this.assignementEntityService.deleteAssignement(id);
	}
}