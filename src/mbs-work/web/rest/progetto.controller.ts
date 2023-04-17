import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProgettoBusinessService } from "../../business/progetto.business.service";
import { ProgettoDto } from "../../dto/progetto.dto";

@ApiTags('progetto')
@Controller('mbs/work')
export class ProgettoController {
    constructor(
        private progettoBusinessService: ProgettoBusinessService,

    ) {}

    @Post('progettos')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createProgetto(@Body() progettoDto: ProgettoDto) {
        if(progettoDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.progettoBusinessService.createProgetto(progettoDto);
    }

    @Put('progettos')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateProgetto(@Body() progettoDto: ProgettoDto) {
        if(progettoDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.progettoBusinessService.editProgetto(progettoDto);
    }

    @Get('progettos')
    @ApiResponse({ status: 200, description: 'List of progettos.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllProgettos(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.progettoBusinessService.searchProgettos(filters);
    }

    @Get('progettos/count')
    @ApiResponse({ status: 200, description: 'Count of progettos.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getProgettosCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.progettoBusinessService.countProgettos(filters);
    }

    @Get('progettos/:id')
    @ApiResponse({ status: 200, description: 'Progetto detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getProgetto(@Param('id') id: number): Promise<ProgettoDto> {
        let progettoDto: ProgettoDto = await this.progettoBusinessService.getProgetto(+id);
        if(progettoDto === null) throw new NotFoundException();
        return progettoDto;
    }

    @Delete('progettos/:id/delete')
    @ApiResponse({ status: 200, description: 'Progetto deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteProgetto(@Param('id') id: number) {
        return this.progettoBusinessService.deleteProgetto(+id);
    }

}