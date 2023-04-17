import { Injectable } from "@nestjs/common";
import { NominaDto } from "../dto/nomina.dto";
import { NominaEntityService } from "../entity/nomina.entity.service";

@Injectable({})
export class NominaBusinessService {
	constructor(
		private nominaEntityService: NominaEntityService,
	) {}

	async createNomina(nominaDto: NominaDto) {
		return this.nominaEntityService.insertNomina(nominaDto);
	}

	async editNomina(nominaDto: NominaDto) {
		return this.nominaEntityService.updateNomina(nominaDto);
	}

	async searchNominas(filters: any): Promise<NominaDto[]> {
		return this.nominaEntityService.getNominas(filters);
	}

	async countNominas(filters: any): Promise<number> {
		return this.nominaEntityService.countNominas(filters);
	}

	async getNomina(id: number): Promise<NominaDto> {
		return this.nominaEntityService.getNomina(id);
	}

	async deleteNomina(id: number) {
		return this.nominaEntityService.deleteNomina(id);
	}
}