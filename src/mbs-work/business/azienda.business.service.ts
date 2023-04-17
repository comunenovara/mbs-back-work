import { Injectable } from "@nestjs/common";
import { AziendaDto } from "../dto/azienda.dto";
import { AziendaEntityService } from "../entity/azienda.entity.service";

@Injectable({})
export class AziendaBusinessService {
	constructor(
		private aziendaEntityService: AziendaEntityService,
	) {}

	async createAzienda(aziendaDto: AziendaDto) {
		return this.aziendaEntityService.insertAzienda(aziendaDto);
	}

	async editAzienda(aziendaDto: AziendaDto) {
		return this.aziendaEntityService.updateAzienda(aziendaDto);
	}

	async searchAziendas(filters: any): Promise<AziendaDto[]> {
		return this.aziendaEntityService.getAziendas(filters);
	}

	async countAziendas(filters: any): Promise<number> {
		return this.aziendaEntityService.countAziendas(filters);
	}

	async getAzienda(id: number): Promise<AziendaDto> {
		return this.aziendaEntityService.getAzienda(id);
	}

	async deleteAzienda(id: number) {
		return this.aziendaEntityService.deleteAzienda(id);
	}
}