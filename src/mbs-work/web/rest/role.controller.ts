import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoleBusinessService } from "../../business/role.business.service";
import { RoleDto } from "../../dto/role.dto";

@ApiTags('role')
@Controller('mbs/work')
export class RoleController {
    constructor(
        private roleBusinessService: RoleBusinessService,

    ) {}

    @Post('roles')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createRole(@Body() roleDto: RoleDto) {
        if(roleDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.roleBusinessService.createRole(roleDto);
    }

    @Put('roles')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateRole(@Body() roleDto: RoleDto) {
        if(roleDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.roleBusinessService.editRole(roleDto);
    }

    @Get('roles')
    @ApiResponse({ status: 200, description: 'List of roles.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllRoles(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.roleBusinessService.searchRoles(filters);
    }

    @Get('roles/count')
    @ApiResponse({ status: 200, description: 'Count of roles.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getRolesCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.roleBusinessService.countRoles(filters);
    }

    @Get('roles/:id')
    @ApiResponse({ status: 200, description: 'Role detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getRole(@Param('id') id: number): Promise<RoleDto> {
        let roleDto: RoleDto = await this.roleBusinessService.getRole(+id);
        if(roleDto === null) throw new NotFoundException();
        return roleDto;
    }

    @Delete('roles/:id/delete')
    @ApiResponse({ status: 200, description: 'Role deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteRole(@Param('id') id: number) {
        return this.roleBusinessService.deleteRole(+id);
    }

}