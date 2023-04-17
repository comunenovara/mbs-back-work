import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { TecnicoBusinessService } from "../../business/tecnico.business.service";
import { TecnicoDto } from "../../dto/tecnico.dto";

@ApiTags('tecnico')
@Controller('mbs/work')
export class TecnicoController {
    constructor(
        private tecnicoBusinessService: TecnicoBusinessService,

    ) {}

    @Post('tecnicos')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createTecnico(@Body() tecnicoDto: TecnicoDto) {
        if(tecnicoDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.tecnicoBusinessService.createTecnico(tecnicoDto);
    }

    @Put('tecnicos')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateTecnico(@Body() tecnicoDto: TecnicoDto) {
        if(tecnicoDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.tecnicoBusinessService.editTecnico(tecnicoDto);
    }

    @Get('tecnicos')
    @ApiResponse({ status: 200, description: 'List of tecnicos.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllTecnicos(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.tecnicoBusinessService.searchTecnicos(filters);
    }

    @Get('tecnicos/count')
    @ApiResponse({ status: 200, description: 'Count of tecnicos.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getTecnicosCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.tecnicoBusinessService.countTecnicos(filters);
    }

    @Get('tecnicos/:id')
    @ApiResponse({ status: 200, description: 'Tecnico detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getTecnico(@Param('id') id: number): Promise<TecnicoDto> {
        let tecnicoDto: TecnicoDto = await this.tecnicoBusinessService.getTecnico(+id);
        if(tecnicoDto === null) throw new NotFoundException();
        return tecnicoDto;
    }

    @Delete('tecnicos/:id/delete')
    @ApiResponse({ status: 200, description: 'Tecnico deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteTecnico(@Param('id') id: number) {
        return this.tecnicoBusinessService.deleteTecnico(+id);
    }

}