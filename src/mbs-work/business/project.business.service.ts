import { Injectable } from "@nestjs/common";
import { ProjectDto } from "../dto/project.dto";
import { ProjectEntityService } from "../entity/project.entity.service";

@Injectable({})
export class ProjectBusinessService {
	constructor(
		private projectEntityService: ProjectEntityService,
	) {}

	async createProject(projectDto: ProjectDto) {
		return this.projectEntityService.insertProject(projectDto);
	}

	async editProject(projectDto: ProjectDto) {
		return this.projectEntityService.updateProject(projectDto);
	}

	async searchProjects(filters: any): Promise<ProjectDto[]> {
		return this.projectEntityService.getProjects(filters);
	}

	async countProjects(filters: any): Promise<number> {
		return this.projectEntityService.countProjects(filters);
	}

	async getProject(id: number): Promise<ProjectDto> {
		return this.projectEntityService.getProject(id);
	}

	async deleteProject(id: number) {
		return this.projectEntityService.deleteProject(id);
	}
}