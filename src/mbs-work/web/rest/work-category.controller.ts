import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { WorkCategoryBusinessService } from "../../business/work-category.business.service";
import { WorkCategoryDto } from "../../dto/work-category.dto";

@ApiTags('workCategory')
@Controller('mbs/work')
export class WorkCategoryController {
    constructor(
        private workCategoryBusinessService: WorkCategoryBusinessService,

    ) {}

    @Post('workCategorys')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createWorkCategory(@Body() workCategoryDto: WorkCategoryDto) {
        if(workCategoryDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.workCategoryBusinessService.createWorkCategory(workCategoryDto);
    }

    @Put('workCategorys')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateWorkCategory(@Body() workCategoryDto: WorkCategoryDto) {
        if(workCategoryDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.workCategoryBusinessService.editWorkCategory(workCategoryDto);
    }

    @Get('workCategorys')
    @ApiResponse({ status: 200, description: 'List of workCategorys.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllWorkCategorys(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.workCategoryBusinessService.searchWorkCategories(filters);
    }

    @Get('workCategorys/count')
    @ApiResponse({ status: 200, description: 'Count of workCategorys.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getWorkCategorysCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.workCategoryBusinessService.countWorkCategories(filters);
    }

    @Get('workCategorys/:id')
    @ApiResponse({ status: 200, description: 'WorkCategory detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getWorkCategory(@Param('id') id: number): Promise<WorkCategoryDto> {
        let workCategoryDto: WorkCategoryDto = await this.workCategoryBusinessService.getWorkCategory(+id);
        if(workCategoryDto === null) throw new NotFoundException();
        return workCategoryDto;
    }

    @Delete('workCategorys/:id/delete')
    @ApiResponse({ status: 200, description: 'WorkCategory deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteWorkCategory(@Param('id') id: number) {
        return this.workCategoryBusinessService.deleteWorkCategory(+id);
    }

}