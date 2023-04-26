import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CompanyBusinessService } from "../../business/company.business.service";
import { CompanyDto } from "../../dto/company.dto";

@ApiTags('company')
@Controller('mbs/work')
export class CompanyController {
    constructor(
        private companyBusinessService: CompanyBusinessService,

    ) {}

    @Post('companys')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createCompany(@Body() companyDto: CompanyDto) {
        if(companyDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.companyBusinessService.createCompany(companyDto);
    }

    @Put('companys')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateCompany(@Body() companyDto: CompanyDto) {
        if(companyDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.companyBusinessService.editCompany(companyDto);
    }

    @Get('companys')
    @ApiResponse({ status: 200, description: 'List of companys.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllCompanys(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.companyBusinessService.searchCompanies(filters);
    }

    @Get('companys/count')
    @ApiResponse({ status: 200, description: 'Count of companys.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getCompanysCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.companyBusinessService.countCompanies(filters);
    }

    @Get('companys/:id')
    @ApiResponse({ status: 200, description: 'Company detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getCompany(@Param('id') id: number): Promise<CompanyDto> {
        let companyDto: CompanyDto = await this.companyBusinessService.getCompany(+id);
        if(companyDto === null) throw new NotFoundException();
        return companyDto;
    }

    @Delete('companys/:id/delete')
    @ApiResponse({ status: 200, description: 'Company deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteCompany(@Param('id') id: number) {
        return this.companyBusinessService.deleteCompany(+id);
    }

}