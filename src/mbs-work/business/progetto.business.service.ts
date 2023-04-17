import { Injectable } from "@nestjs/common";
import { ProgettoDto } from "../dto/progetto.dto";
import { ProgettoEntityService } from "../entity/progetto.entity.service";

@Injectable({})
export class ProgettoBusinessService {
	constructor(
		private progettoEntityService: ProgettoEntityService,
	) {}

	async createProgetto(progettoDto: ProgettoDto) {
		return this.progettoEntityService.insertProgetto(progettoDto);
	}

	async editProgetto(progettoDto: ProgettoDto) {
		return this.progettoEntityService.updateProgetto(progettoDto);
	}

	async searchProgettos(filters: any): Promise<ProgettoDto[]> {
		return this.progettoEntityService.getProgettos(filters);
	}

	async countProgettos(filters: any): Promise<number> {
		return this.progettoEntityService.countProgettos(filters);
	}

	async getProgetto(id: number): Promise<ProgettoDto> {
		return this.progettoEntityService.getProgetto(id);
	}

	async deleteProgetto(id: number) {
		return this.progettoEntityService.deleteProgetto(id);
	}
}