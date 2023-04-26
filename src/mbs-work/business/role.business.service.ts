import { Injectable } from "@nestjs/common";
import { RoleDto } from "../dto/role.dto";
import { RoleEntityService } from "../entity/role.entity.service";

@Injectable({})
export class RoleBusinessService {
	constructor(
		private roleEntityService: RoleEntityService,
	) {}

	async createRole(roleDto: RoleDto) {
		return this.roleEntityService.insertRole(roleDto);
	}

	async editRole(roleDto: RoleDto) {
		return this.roleEntityService.updateRole(roleDto);
	}

	async searchRoles(filters: any): Promise<RoleDto[]> {
		return this.roleEntityService.getRoles(filters);
	}

	async countRoles(filters: any): Promise<number> {
		return this.roleEntityService.countRoles(filters);
	}

	async getRole(id: number): Promise<RoleDto> {
		return this.roleEntityService.getRole(id);
	}

	async deleteRole(id: number) {
		return this.roleEntityService.deleteRole(id);
	}
}