import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { NominaBusinessService } from "../../business/nomina.business.service";
import { NominaDto } from "../../dto/nomina.dto";

@ApiTags('nomina')
@Controller('mbs/work')
export class NominaController {
    constructor(
        private nominaBusinessService: NominaBusinessService,

    ) {}

    @Post('nominas')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createNomina(@Body() nominaDto: NominaDto) {
        if(nominaDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.nominaBusinessService.createNomina(nominaDto);
    }

    @Put('nominas')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateNomina(@Body() nominaDto: NominaDto) {
        if(nominaDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.nominaBusinessService.editNomina(nominaDto);
    }

    @Get('nominas')
    @ApiResponse({ status: 200, description: 'List of nominas.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllNominas(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.nominaBusinessService.searchNominas(filters);
    }

    @Get('nominas/count')
    @ApiResponse({ status: 200, description: 'Count of nominas.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getNominasCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.nominaBusinessService.countNominas(filters);
    }

    @Get('nominas/:id')
    @ApiResponse({ status: 200, description: 'Nomina detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getNomina(@Param('id') id: number): Promise<NominaDto> {
        let nominaDto: NominaDto = await this.nominaBusinessService.getNomina(+id);
        if(nominaDto === null) throw new NotFoundException();
        return nominaDto;
    }

    @Delete('nominas/:id/delete')
    @ApiResponse({ status: 200, description: 'Nomina deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteNomina(@Param('id') id: number) {
        return this.nominaBusinessService.deleteNomina(+id);
    }

}