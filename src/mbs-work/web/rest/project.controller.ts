import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProjectBusinessService } from "../../business/project.business.service";
import { ProjectDto } from "../../dto/project.dto";

@ApiTags('project')
@Controller('mbs/work')
export class ProjectController {
    constructor(
        private projectBusinessService: ProjectBusinessService,

    ) {}

    @Post('projects')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createProject(@Body() projectDto: ProjectDto) {
        if(projectDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.projectBusinessService.createProject(projectDto);
    }

    @Put('projects')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateProject(@Body() projectDto: ProjectDto) {
        if(projectDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.projectBusinessService.editProject(projectDto);
    }

    @Get('projects')
    @ApiResponse({ status: 200, description: 'List of projects.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllProjects(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.projectBusinessService.searchProjects(filters);
    }

    @Get('projects/count')
    @ApiResponse({ status: 200, description: 'Count of projects.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getProjectsCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.projectBusinessService.countProjects(filters);
    }

    @Get('projects/:id')
    @ApiResponse({ status: 200, description: 'Project detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getProject(@Param('id') id: number): Promise<ProjectDto> {
        let projectDto: ProjectDto = await this.projectBusinessService.getProject(+id);
        if(projectDto === null) throw new NotFoundException();
        return projectDto;
    }

    @Delete('projects/:id/delete')
    @ApiResponse({ status: 200, description: 'Project deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteProject(@Param('id') id: number) {
        return this.projectBusinessService.deleteProject(+id);
    }

}