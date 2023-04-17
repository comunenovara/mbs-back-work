import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AziendaBusinessService } from "../../business/azienda.business.service";
import { AziendaDto } from "../../dto/azienda.dto";

@ApiTags('azienda')
@Controller('mbs/work')
export class AziendaController {
    constructor(
        private aziendaBusinessService: AziendaBusinessService,

    ) {}

    @Post('aziendas')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createAzienda(@Body() aziendaDto: AziendaDto) {
        if(aziendaDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.aziendaBusinessService.createAzienda(aziendaDto);
    }

    @Put('aziendas')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateAzienda(@Body() aziendaDto: AziendaDto) {
        if(aziendaDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.aziendaBusinessService.editAzienda(aziendaDto);
    }

    @Get('aziendas')
    @ApiResponse({ status: 200, description: 'List of aziendas.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllAziendas(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.aziendaBusinessService.searchAziendas(filters);
    }

    @Get('aziendas/count')
    @ApiResponse({ status: 200, description: 'Count of aziendas.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAziendasCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.aziendaBusinessService.countAziendas(filters);
    }

    @Get('aziendas/:id')
    @ApiResponse({ status: 200, description: 'Azienda detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getAzienda(@Param('id') id: number): Promise<AziendaDto> {
        let aziendaDto: AziendaDto = await this.aziendaBusinessService.getAzienda(+id);
        if(aziendaDto === null) throw new NotFoundException();
        return aziendaDto;
    }

    @Delete('aziendas/:id/delete')
    @ApiResponse({ status: 200, description: 'Azienda deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteAzienda(@Param('id') id: number) {
        return this.aziendaBusinessService.deleteAzienda(+id);
    }

}