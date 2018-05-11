import { createQueryBuilder, getConnection, getRepository, Any, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Project } from "../entity/Project";
import { Assignment } from "../entity/Project.assignment";
import { User } from "../entity/User";

interface ProjectAddRes {
    projectName: string;
    userId: number;
}

export class ProjectController {

    private projectRepository: Repository<Project> = getRepository(Project);
    private assignmentRepository: Repository<Assignment> = getRepository(Assignment);
    private userRepository: Repository<User> = getRepository(User);

    async all(req: Request, res: Response, next: NextFunction) {
        const { projectId } = req.params;
        try {
            const allProjectsList = await this.projectRepository
                .createQueryBuilder("project")
                .select()
                .leftJoinAndSelect("project.assignment", "assignment")
                .leftJoinAndSelect("assignment.user", "user")
                .leftJoinAndSelect("project.sprint", "sprint")
                .leftJoinAndSelect("project.story", "story")
                .getMany();
            res.status(200).json(allProjectsList)
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

    async allByUserId(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params;
        try {
            // Experimenting with QueryBuilder
            const projectsList = await this.projectRepository
                .createQueryBuilder("project")
                .select()
                .leftJoinAndSelect("project.assignment", "assignment")
                .leftJoinAndSelect("assignment.user", "user")
                .leftJoinAndSelect("project.sprint", "sprint")
                .leftJoinAndSelect("project.story", "story")
                .where("assignment.user.user_id = :id", { id: userId })
                .getMany();
            res.status(200).json(projectsList)
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

    async one(req: Request, res: Response, next: NextFunction) {
        const { projectId } = req.params;
        let project = new Project;

        try {
            const project = await this.projectRepository
                .createQueryBuilder("project")
                .select()
                .leftJoinAndSelect("project.assignment", "assignment")
                .leftJoinAndSelect("assignment.user", "user")
                .leftJoinAndSelect("project.sprint", "sprint")
                .leftJoinAndSelect("project.story", "story")
                .where("project_id = :id", { id: projectId })
                .getOne();
            res.status(200).json(project)
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

    async add(req: Request, res: Response, next: NextFunction) {
        const { projectName } = req.body;
        const { userId } = req.params;

        try {
            let newProject = new Project;
            newProject.project_name = projectName;
            newProject.created_on = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

            let newAssignment = new Assignment;
            newAssignment.user = await this.userRepository.findOne({ user_id: userId });
            newAssignment.user_role = "Lead";

            newProject.assignment = [newAssignment];

            await this.projectRepository.save(newProject)
            res.status(200).json(newProject);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

    async save(req: Request, res: Response, next: NextFunction) {
        const { projectName } = req.body;
        const { projectId } = req.params;

        try {
            const response = await this.projectRepository
                .createQueryBuilder()
                .update(Project)
                .set({
                    project_name: projectName
                })
                .where({
                    project_id: projectId
                })
                .execute()
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const { projectId } = req.params;

        try {
            const response = await this.projectRepository
                .createQueryBuilder()
                .delete()
                .from(Project)
                .where({
                    project_id: projectId
                })
                .execute()
            res.status(200).json(response)
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

}