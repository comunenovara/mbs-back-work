import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AssignementBusinessService } from "../../business/assignement.business.service";
import { AssignementDto } from "../../dto/assignement.dto";

@ApiTags('assignement')
@Controller('mbs/work')
export class AssignementController {
    constructor(
        private assignementBusinessService: AssignementBusinessService,

    ) {}

    @Post('assignements')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createAssignement(@Body() assignementDto: AssignementDto) {
        if(assignementDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.assignementBusinessService.createAssignement(assignementDto);
    }

    @Put('assignements')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateAssignement(@Body() assignementDto: AssignementDto) {
        if(assignementDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.assignementBusinessService.editAssignement(assignementDto);
    }

    @Get('assignements')
    @ApiResponse({ status: 200, description: 'List of assignements.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllAssignements(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.assignementBusinessService.searchAssignements(filters);
    }

    @Get('assignements/count')
    @ApiResponse({ status: 200, description: 'Count of assignements.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAssignementsCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.assignementBusinessService.countAssignements(filters);
    }

    @Get('assignements/:id')
    @ApiResponse({ status: 200, description: 'Assignement detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getAssignement(@Param('id') id: number): Promise<AssignementDto> {
        let assignementDto: AssignementDto = await this.assignementBusinessService.getAssignement(+id);
        if(assignementDto === null) throw new NotFoundException();
        return assignementDto;
    }

    @Delete('assignements/:id/delete')
    @ApiResponse({ status: 200, description: 'Assignement deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteAssignement(@Param('id') id: number) {
        return this.assignementBusinessService.deleteAssignement(+id);
    }

}