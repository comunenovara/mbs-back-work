import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { FaseBusinessService } from "../../business/fase.business.service";
import { FaseDto } from "../../dto/fase.dto";

@ApiTags('fase')
@Controller('mbs/work')
export class FaseController {
    constructor(
        private faseBusinessService: FaseBusinessService,

    ) {}

    @Post('fases')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createFase(@Body() faseDto: FaseDto) {
        if(faseDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.faseBusinessService.createFase(faseDto);
    }

    @Put('fases')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateFase(@Body() faseDto: FaseDto) {
        if(faseDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.faseBusinessService.editFase(faseDto);
    }

    @Get('fases')
    @ApiResponse({ status: 200, description: 'List of fases.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllFases(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.faseBusinessService.searchFases(filters);
    }

    @Get('fases/count')
    @ApiResponse({ status: 200, description: 'Count of fases.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getFasesCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.faseBusinessService.countFases(filters);
    }

    @Get('fases/:id')
    @ApiResponse({ status: 200, description: 'Fase detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getFase(@Param('id') id: number): Promise<FaseDto> {
        let faseDto: FaseDto = await this.faseBusinessService.getFase(+id);
        if(faseDto === null) throw new NotFoundException();
        return faseDto;
    }

    @Delete('fases/:id/delete')
    @ApiResponse({ status: 200, description: 'Fase deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteFase(@Param('id') id: number) {
        return this.faseBusinessService.deleteFase(+id);
    }

}