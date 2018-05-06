import { getRepository, Any } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Project } from "../entity/Project";
import { Assignment } from "../entity/Project.assignment";

export class ProjectAssignmentController {

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
            const { newUsers } = req.body; // Array of user assignments
            const { projectid } = req.params; // Project ID

            let project = await this.projectRepository
                .findOne({ project_id: projectid }, { relations: ['assignment'] });

            project.assignment = [...project.assignment, ...newUsers];

            await this.projectRepository.save(project)
                .then(() => res.status(200).json('User(s) assigned successfully'));
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const { delUsers } = req.body; // Array of user assignments

            const deletion = await this.assignmentRepository.find({
                select: ["id"],
                where: {
                    user_id: Any(delUsers)
                }
            });

            await this.assignmentRepository.delete(deletion.map(x => x.id));
            res.status(200).json("Assignments deleted");
        } catch (err) {
            res.status(400).json(err);
        }
    }

}