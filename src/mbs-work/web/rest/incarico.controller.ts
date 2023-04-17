import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { IncaricoBusinessService } from "../../business/incarico.business.service";
import { IncaricoDto } from "../../dto/incarico.dto";

@ApiTags('incarico')
@Controller('mbs/work')
export class IncaricoController {
    constructor(
        private incaricoBusinessService: IncaricoBusinessService,

    ) {}

    @Post('incaricos')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createIncarico(@Body() incaricoDto: IncaricoDto) {
        if(incaricoDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.incaricoBusinessService.createIncarico(incaricoDto);
    }

    @Put('incaricos')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateIncarico(@Body() incaricoDto: IncaricoDto) {
        if(incaricoDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.incaricoBusinessService.editIncarico(incaricoDto);
    }

    @Get('incaricos')
    @ApiResponse({ status: 200, description: 'List of incaricos.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllIncaricos(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.incaricoBusinessService.searchIncaricos(filters);
    }

    @Get('incaricos/count')
    @ApiResponse({ status: 200, description: 'Count of incaricos.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getIncaricosCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.incaricoBusinessService.countIncaricos(filters);
    }

    @Get('incaricos/:id')
    @ApiResponse({ status: 200, description: 'Incarico detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getIncarico(@Param('id') id: number): Promise<IncaricoDto> {
        let incaricoDto: IncaricoDto = await this.incaricoBusinessService.getIncarico(+id);
        if(incaricoDto === null) throw new NotFoundException();
        return incaricoDto;
    }

    @Delete('incaricos/:id/delete')
    @ApiResponse({ status: 200, description: 'Incarico deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteIncarico(@Param('id') id: number) {
        return this.incaricoBusinessService.deleteIncarico(+id);
    }

}