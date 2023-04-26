import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Decimal } from "@prisma/client/runtime";

import { ProjectDto } from "./project.dto";
import { RoleDto } from "./role.dto";
import { WorkCategoryDto } from "./work-category.dto";
import { EmployeeDto } from "./employee.dto";
import { CompanyDto } from "./company.dto";

export class AssignementDto {
	
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
	external?: boolean;


	@IsNumber()
	projectId?: number;
	project?: ProjectDto;

	@IsNumber()
	roleId?: number;
	role?: RoleDto;

	@IsOptional()
	@IsNumber()
	workCategoryId?: number;
	workCategory?: WorkCategoryDto;

	@IsOptional()
	@IsNumber()
	employeeId?: number;
	employee?: EmployeeDto;

	@IsOptional()
	@IsNumber()
	companyId?: number;
	company?: CompanyDto;

}