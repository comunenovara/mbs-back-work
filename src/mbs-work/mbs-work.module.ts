import { Module } from '@nestjs/common';
import { PrismaService } from './repository/prisma.service';

import { IncaricoBusinessService } from './business/incarico.business.service';
import { IncaricoEntityService } from './entity/incarico.entity.service';
import { IncaricoController } from './web/rest/incarico.controller';
import { FaseBusinessService } from './business/fase.business.service';
import { FaseEntityService } from './entity/fase.entity.service';
import { FaseController } from './web/rest/fase.controller';
import { ProgettoBusinessService } from './business/progetto.business.service';
import { ProgettoEntityService } from './entity/progetto.entity.service';
import { ProgettoController } from './web/rest/progetto.controller';
import { TecnicoBusinessService } from './business/tecnico.business.service';
import { TecnicoEntityService } from './entity/tecnico.entity.service';
import { TecnicoController } from './web/rest/tecnico.controller';
import { AziendaBusinessService } from './business/azienda.business.service';
import { AziendaEntityService } from './entity/azienda.entity.service';
import { AziendaController } from './web/rest/azienda.controller';
import { NominaBusinessService } from './business/nomina.business.service';
import { NominaEntityService } from './entity/nomina.entity.service';
import { NominaController } from './web/rest/nomina.controller';

@Module({
	providers: [
		PrismaService,

		IncaricoBusinessService,
		IncaricoEntityService,
		FaseBusinessService,
		FaseEntityService,
		ProgettoBusinessService,
		ProgettoEntityService,
		TecnicoBusinessService,
		TecnicoEntityService,
		AziendaBusinessService,
		AziendaEntityService,
		NominaBusinessService,
		NominaEntityService,

	],
	controllers: [
		IncaricoController,
		FaseController,
		ProgettoController,
		TecnicoController,
		AziendaController,
		NominaController,

	]
})
export class MbsWorkModule { }
