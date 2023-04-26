import { Module } from '@nestjs/common';
import { PrismaService } from './repository/prisma.service';

import { ProjectBusinessService } from './business/project.business.service';
import { ProjectEntityService } from './entity/project.entity.service';
import { ProjectController } from './web/rest/project.controller';
import { RoleBusinessService } from './business/role.business.service';
import { RoleEntityService } from './entity/role.entity.service';
import { RoleController } from './web/rest/role.controller';
import { WorkCategoryBusinessService } from './business/work-category.business.service';
import { WorkCategoryEntityService } from './entity/work-category.entity.service';
import { WorkCategoryController } from './web/rest/work-category.controller';
import { EmployeeBusinessService } from './business/employee.business.service';
import { EmployeeEntityService } from './entity/employee.entity.service';
import { EmployeeController } from './web/rest/employee.controller';
import { CompanyBusinessService } from './business/company.business.service';
import { CompanyEntityService } from './entity/company.entity.service';
import { CompanyController } from './web/rest/company.controller';
import { AssignementBusinessService } from './business/assignement.business.service';
import { AssignementEntityService } from './entity/assignement.entity.service';
import { AssignementController } from './web/rest/assignement.controller';
import { IncaricoBusinessService } from './business/incarico.business.service';
import { IncaricoEntityService } from './entity/incarico.entity.service';
import { IncaricoController } from './web/rest/incarico.controller';
import { FaseBusinessService } from './business/fase.business.service';
import { FaseEntityService } from './entity/fase.entity.service';
import { FaseController } from './web/rest/fase.controller';
import { TecnicoBusinessService } from './business/tecnico.business.service';
import { TecnicoEntityService } from './entity/tecnico.entity.service';
import { TecnicoController } from './web/rest/tecnico.controller';
import { AziendaBusinessService } from './business/azienda.business.service';
import { AziendaEntityService } from './entity/azienda.entity.service';
import { AziendaController } from './web/rest/azienda.controller';
import { ProgettoBusinessService } from './business/progetto.business.service';
import { ProgettoEntityService } from './entity/progetto.entity.service';
import { ProgettoController } from './web/rest/progetto.controller';
import { NominaBusinessService } from './business/nomina.business.service';
import { NominaEntityService } from './entity/nomina.entity.service';
import { NominaController } from './web/rest/nomina.controller';

@Module({
	providers: [
		PrismaService,

		ProjectBusinessService,
		ProjectEntityService,
		RoleBusinessService,
		RoleEntityService,
		WorkCategoryBusinessService,
		WorkCategoryEntityService,
		EmployeeBusinessService,
		EmployeeEntityService,
		CompanyBusinessService,
		CompanyEntityService,
		AssignementBusinessService,
		AssignementEntityService,
		IncaricoBusinessService,
		IncaricoEntityService,
		FaseBusinessService,
		FaseEntityService,
		TecnicoBusinessService,
		TecnicoEntityService,
		AziendaBusinessService,
		AziendaEntityService,
		ProgettoBusinessService,
		ProgettoEntityService,
		NominaBusinessService,
		NominaEntityService,

	],
	controllers: [
		ProjectController,
		RoleController,
		WorkCategoryController,
		EmployeeController,
		CompanyController,
		AssignementController,
		IncaricoController,
		FaseController,
		TecnicoController,
		AziendaController,
		ProgettoController,
		NominaController,

	]
})
export class MbsWorkModule { }
