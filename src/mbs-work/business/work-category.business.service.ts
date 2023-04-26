import { Injectable } from "@nestjs/common";
import { WorkCategoryDto } from "../dto/work-category.dto";
import { WorkCategoryEntityService } from "../entity/work-category.entity.service";

@Injectable({})
export class WorkCategoryBusinessService {
	constructor(
		private workCategoryEntityService: WorkCategoryEntityService,
	) {}

	async createWorkCategory(workCategoryDto: WorkCategoryDto) {
		return this.workCategoryEntityService.insertWorkCategory(workCategoryDto);
	}

	async editWorkCategory(workCategoryDto: WorkCategoryDto) {
		return this.workCategoryEntityService.updateWorkCategory(workCategoryDto);
	}

	async searchWorkCategories(filters: any): Promise<WorkCategoryDto[]> {
		return this.workCategoryEntityService.getWorkCategories(filters);
	}

	async countWorkCategories(filters: any): Promise<number> {
		return this.workCategoryEntityService.countWorkCategories(filters);
	}

	async getWorkCategory(id: number): Promise<WorkCategoryDto> {
		return this.workCategoryEntityService.getWorkCategory(id);
	}

	async deleteWorkCategory(id: number) {
		return this.workCategoryEntityService.deleteWorkCategory(id);
	}
}