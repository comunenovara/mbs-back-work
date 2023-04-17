import { Injectable } from "@nestjs/common";
import { FaseDto } from "../dto/fase.dto";
import { FaseEntityService } from "../entity/fase.entity.service";

@Injectable({})
export class FaseBusinessService {
	constructor(
		private faseEntityService: FaseEntityService,
	) {}

	async createFase(faseDto: FaseDto) {
		return this.faseEntityService.insertFase(faseDto);
	}

	async editFase(faseDto: FaseDto) {
		return this.faseEntityService.updateFase(faseDto);
	}

	async searchFases(filters: any): Promise<FaseDto[]> {
		return this.faseEntityService.getFases(filters);
	}

	async countFases(filters: any): Promise<number> {
		return this.faseEntityService.countFases(filters);
	}

	async getFase(id: number): Promise<FaseDto> {
		return this.faseEntityService.getFase(id);
	}

	async deleteFase(id: number) {
		return this.faseEntityService.deleteFase(id);
	}
}