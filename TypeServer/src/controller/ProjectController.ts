import { createQueryBuilder, getConnection, getRepository, Any, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Project } from "../entity/Project";
import { Assignment } from "../entity/Project.assignment";

interface ProjectAddRes {
    projectName: string;
    userId: number;
}

export class ProjectController {

    private projectRepository: Repository<Project> = getRepository(Project);
    private assignmentRepository: Repository<Assignment> = getRepository(Assignment);

    async all(req: Request, res: Response, next: NextFunction) {
        const { projectId } = req.params;
        try {
            await this.projectRepository
                .createQueryBuilder("project")
                .select()
                .leftJoinAndSelect("project.assignment", "assignment")
                .leftJoinAndSelect("project.sprint", "sprint")
                .leftJoinAndSelect("project.story", "story")
                .getMany()
                .then(allProjectsList => res.status(200).json(allProjectsList))
                .catch(err => res.status(400).json(err))

        } catch (err) {
            res.status(400).json(err);
        }
    }

    async allByUserId(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params;
        try {
            // Experimenting with QueryBuilder
            await this.projectRepository
                .createQueryBuilder("project")
                .select()
                .leftJoinAndSelect("project.assignment", "assignment")
                .leftJoinAndSelect("project.sprint", "sprint")
                .leftJoinAndSelect("project.story", "story")
                .where("assignment.user_id = :id", { id: userId })
                .getMany()
                .then(projectsList => res.status(200).json(projectsList))
                .catch(err => res.status(400).json(err));

            // OLD CODE
            // const userIdList: Assignment[] = await this.assignmentRepository.find({
            //     relations: ['project'],
            //     where: {
            //         user_id: userId
            //     }
            // });

            // const projectsList: Project[] = await this.projectRepository.find({
            //     relations: ['assignment'],
            //     where: {
            //         project_id: Any(userIdList.map(x => x.project.project_id))
            //     }
            // })

        } catch (err) {
            res.status(400).json(err);
        }
    }

    async one(req: Request, res: Response, next: NextFunction) {
        const { projectId } = req.params;
        try {
            await this.projectRepository
                .createQueryBuilder("project")
                .select()
                .leftJoinAndSelect("project.assignment", "assignment")
                .leftJoinAndSelect("project.sprint", "sprint")
                .leftJoinAndSelect("project.story", "story")
                .where("project_id = :id", { id: projectId })
                .getOne()
                .then(project => res.status(200).json(project))
                .catch(err => res.status(400).json(err));

        } catch (err) {
            res.status(400).json(err);
        }
    }

    async add(req: Request, res: Response, next: NextFunction) {
        const {
            projectName, // New project name
            userId // User ID of the project creator
        }: ProjectAddRes = req.body;

        try {
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
        const { projectName } = req.body;
        const { projectId } = req.params;

        try {
            await this.projectRepository
                .createQueryBuilder()
                .update(Project)
                .set({
                    project_name: projectName
                })
                .where({
                    project_id: projectId
                })
                .execute()
                .then(x => res.status(200).json('Project update success'))
                .catch(err => res.status(400).json(err))

        } catch (err) {
            res.status(400).json(err);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const { projectId } = req.params;

        try {
            await this.projectRepository
                .createQueryBuilder()
                .delete()
                .from(Project)
                .where({
                    project_id: projectId
                })
                .execute()
                .then(() => res.status(200).json("Project deleted"))
                .catch(err => res.status(400).json(err));

        } catch (err) {
            res.status(400).json(err);
        }
    }

}