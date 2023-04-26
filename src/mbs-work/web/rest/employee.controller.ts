import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { EmployeeBusinessService } from "../../business/employee.business.service";
import { EmployeeDto } from "../../dto/employee.dto";

@ApiTags('employee')
@Controller('mbs/work')
export class EmployeeController {
    constructor(
        private employeeBusinessService: EmployeeBusinessService,

    ) {}

    @Post('employees')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createEmployee(@Body() employeeDto: EmployeeDto) {
        if(employeeDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.employeeBusinessService.createEmployee(employeeDto);
    }

    @Put('employees')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateEmployee(@Body() employeeDto: EmployeeDto) {
        if(employeeDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.employeeBusinessService.editEmployee(employeeDto);
    }

    @Get('employees')
    @ApiResponse({ status: 200, description: 'List of employees.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllEmployees(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.employeeBusinessService.searchEmployees(filters);
    }

    @Get('employees/count')
    @ApiResponse({ status: 200, description: 'Count of employees.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getEmployeesCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.employeeBusinessService.countEmployees(filters);
    }

    @Get('employees/:id')
    @ApiResponse({ status: 200, description: 'Employee detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getEmployee(@Param('id') id: number): Promise<EmployeeDto> {
        let employeeDto: EmployeeDto = await this.employeeBusinessService.getEmployee(+id);
        if(employeeDto === null) throw new NotFoundException();
        return employeeDto;
    }

    @Delete('employees/:id/delete')
    @ApiResponse({ status: 200, description: 'Employee deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteEmployee(@Param('id') id: number) {
        return this.employeeBusinessService.deleteEmployee(+id);
    }

}