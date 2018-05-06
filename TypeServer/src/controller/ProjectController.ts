import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Project } from "../entity/Project";
import { Assignment } from "../entity/Project.assignment";

interface ProjectAddRes {
    projectName: string;
    userId: number;
}

export class ProjectController {

    private projectRepository = getRepository(Project);
    private assignmentRepository = getRepository(Assignment);

    async all(req: Request, res: Response, next: NextFunction) {
        return this.projectRepository.find();
    }

    async one(req: Request, res: Response, next: NextFunction) {
        return this.projectRepository.findOne(req.params.id);
    }

    async add(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                projectName, // New project name
                userId // User ID of the project creator
            }: ProjectAddRes = req.body;

            let newProject = new Project;
            newProject.project_name = projectName;
            newProject.created_on = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

            let newAssignment = new Assignment;
            newAssignment.user_id = userId;
            newAssignment.user_role = "Lead";

            newProject.assignment = [newAssignment];

            await this.projectRepository.save(newProject)
                .then(() => res.status(200).json('Success'));
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async save(req: Request, res: Response, next: NextFunction) {
        try {
            const { projectId, projectName } = req.body;

            let project = await this.projectRepository.findOne({ project_id: projectId });
            project.project_name = projectName;

            await this.projectRepository.save(project)
                .then(() => res.status(200).json('Success'));
        } catch (err) {

        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        await this.projectRepository.remove(req.params.id);
    }

}