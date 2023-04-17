import { Injectable } from "@nestjs/common";
import { IncaricoDto } from "../dto/incarico.dto";
import { IncaricoEntityService } from "../entity/incarico.entity.service";

@Injectable({})
export class IncaricoBusinessService {
	constructor(
		private incaricoEntityService: IncaricoEntityService,
	) {}

	async createIncarico(incaricoDto: IncaricoDto) {
		return this.incaricoEntityService.insertIncarico(incaricoDto);
	}

	async editIncarico(incaricoDto: IncaricoDto) {
		return this.incaricoEntityService.updateIncarico(incaricoDto);
	}

	async searchIncaricos(filters: any): Promise<IncaricoDto[]> {
		return this.incaricoEntityService.getIncaricos(filters);
	}

	async countIncaricos(filters: any): Promise<number> {
		return this.incaricoEntityService.countIncaricos(filters);
	}

	async getIncarico(id: number): Promise<IncaricoDto> {
		return this.incaricoEntityService.getIncarico(id);
	}

	async deleteIncarico(id: number) {
		return this.incaricoEntityService.deleteIncarico(id);
	}
}