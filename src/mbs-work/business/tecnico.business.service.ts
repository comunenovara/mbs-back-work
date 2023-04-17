import { Injectable } from "@nestjs/common";
import { TecnicoDto } from "../dto/tecnico.dto";
import { TecnicoEntityService } from "../entity/tecnico.entity.service";

@Injectable({})
export class TecnicoBusinessService {
	constructor(
		private tecnicoEntityService: TecnicoEntityService,
	) {}

	async createTecnico(tecnicoDto: TecnicoDto) {
		return this.tecnicoEntityService.insertTecnico(tecnicoDto);
	}

	async editTecnico(tecnicoDto: TecnicoDto) {
		return this.tecnicoEntityService.updateTecnico(tecnicoDto);
	}

	async searchTecnicos(filters: any): Promise<TecnicoDto[]> {
		return this.tecnicoEntityService.getTecnicos(filters);
	}

	async countTecnicos(filters: any): Promise<number> {
		return this.tecnicoEntityService.countTecnicos(filters);
	}

	async getTecnico(id: number): Promise<TecnicoDto> {
		return this.tecnicoEntityService.getTecnico(id);
	}

	async deleteTecnico(id: number) {
		return this.tecnicoEntityService.deleteTecnico(id);
	}
}