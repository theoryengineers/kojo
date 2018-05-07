import { getRepository, Any, getConnection, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Project } from "../entity/Project";
import { Sprint } from "../entity/Project.sprint";

export class ProjectSprintController {
    private projectRepository: Repository<Project> = getRepository(Project);
    private sprintRepository: Repository<Sprint> = getRepository(Sprint);

    async add(req: Request, res: Response, next: NextFunction) {
        const { projectId } = req.params;
        const { sprintName, sprintDescription } = req.body;

        try {
            let newSprint = new Sprint;
            newSprint.sprint_name = sprintName;
            newSprint.sprint_description = sprintDescription;
            newSprint.project = await this.projectRepository.findOne({
                where: {
                    project_id: projectId
                }
            })

            await this.sprintRepository
                .createQueryBuilder()
                .insert()
                .into(Sprint)
                .values(newSprint)
                .execute()
                .then(response => res.status(200).json(newSprint))
                .catch(err => res.status(400).json(err));

        } catch (err) {

        }
    }

    async save(req: Request, res: Response, next: NextFunction) {
        const { projectId, sprintId } = req.params;
        const { sprintName, sprintDescription } = req.body;

        try {
            await this.sprintRepository
                .createQueryBuilder()
                .update(Sprint)
                .set({
                    sprint_name: sprintName,
                    sprint_description: sprintDescription
                })
                .where({
                    sprint_id: sprintId,
                    project: { project_id: projectId }
                })
                .execute()
                .then(x => res.status(200).json("Sprint Updated"))
                .catch(err => res.status(400).json(err))

        } catch (err) {
            res.status(400).json(err)
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const { projectId, sprintId } = req.params;

        try {
            await this.sprintRepository
                .createQueryBuilder()
                .delete()
                .from(Sprint)
                .where({
                    sprint_id: sprintId,
                    project: { project_id: projectId }
                })
                .execute()
                .then(() => res.status(200).json("Sprint Deleted"))
                .catch(err => res.status(400).json(err))

        } catch (err) {
            res.status(400).json(err);
        }
    }

    async one(req: Request, res: Response, next: NextFunction) {
        const { projectId, sprintId } = req.params;

        try {
            await this.sprintRepository
                .createQueryBuilder()
                .select()
                .where({
                    sprint_id: sprintId,
                    project: { project_id: projectId }
                })
                .getOne()
                .then(sprint => res.status(200).json(sprint))
                .catch(err => res.status(400).json(err))

        } catch (err) {
            res.status(400).json(err);
        }
    }

    async allByProjectId(req: Request, res: Response, next: NextFunction) {
        const { projectId } = req.params;

        try {
            await this.sprintRepository
                .createQueryBuilder()
                .select()
                .where({
                    project: { project_id: projectId }
                })
                .getMany()
                .then(sprints => res.status(200).json(sprints))
                .catch(err => res.status(400).json(err))

        } catch (err) {
            res.status(400).json(err);
        }
    }
}