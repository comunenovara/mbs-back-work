import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Decimal } from "@prisma/client/runtime";

import { IncaricoDto } from "./incarico.dto";
import { FaseDto } from "./fase.dto";
import { ProgettoDto } from "./progetto.dto";
import { TecnicoDto } from "./tecnico.dto";
import { AziendaDto } from "./azienda.dto";

export class NominaDto {
	
	@ApiProperty({
		type: Number,
		required: false
	})
	@IsNumber()
	@IsOptional()
	id?: number;


    @ApiProperty({
		type: Boolean,
		required: false
	})
	@IsOptional()
	@IsBoolean()
	ie?: boolean;


	@IsNumber()
	incaricoId?: number;
	incarico?: IncaricoDto;

	@IsNumber()
	faseId?: number;
	fase?: FaseDto;

	@IsNumber()
	progettoId?: number;
	progetto?: ProgettoDto;

	@IsNumber()
	tecnicoId?: number;
	tecnico?: TecnicoDto;

	@IsOptional()
	@IsNumber()
	aziendaId?: number;
	azienda?: AziendaDto;

}