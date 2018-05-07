import { getRepository, Any, getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Project } from "../entity/Project";
import { Assignment } from "../entity/Project.assignment";

export class ProjectAssignmentController {

    private projectRepository = getRepository(Project);
    private assignmentRepository = getRepository(Assignment);

    async allByProjectId(req: Request, res: Response, next: NextFunction) {
        const { projectId } = req.params;
        try {
            await this.assignmentRepository
                .createQueryBuilder()
                .select()
                .where({
                    project: { project_id: projectId }
                })
                .getMany()
                .then(x => res.status(200).json(x))
                .catch(err => res.status(400).json(err));

        } catch (err) {
            res.status(400).json(err);
        }
    }

    async all(req: Request, res: Response, next: NextFunction) {
        return this.projectRepository.find();
    }

    async one(req: Request, res: Response, next: NextFunction) {
        return this.projectRepository.findOne(req.params.id);
    }

    async add(req: Request, res: Response, next: NextFunction) {
        try {
            const { newUsers } = req.body; // Array of user assignments
            const { projectId } = req.params; // Project ID

            let newAssignment: Assignment[] = newUsers.map((x, i) => {
                return {
                    user_id: x.user_id,
                    user_role: x.user_role,
                    project: { project_id: projectId }
                };
            });

            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Assignment)
                .values(newAssignment)
                .execute()
                .catch(err => console.log(err))

            res.status(200).json('User(s) assigned successfully');
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const { delUsers } = req.body; // Array of user assignments
        const { projectId } = req.params;

        try {
            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(Assignment)
                .where({
                    project: { project_id: projectId },
                    user_id: Any(delUsers)
                })
                .execute();

            res.status(200).json("Assignments deleted");
        } catch (err) {
            res.status(400).json(err);
        }
    }

}