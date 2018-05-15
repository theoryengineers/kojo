import { getRepository, Any, getConnection, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Story } from "../entity/Story";
import { Project } from "../entity/Project";
import { Sprint } from "../entity/Project.sprint";

interface StoryFromClient {
    storyFromClient: {
        storyTitle: string;
        storyCategory: string;
        storyDescription: string;
        storyOrder: number;
    }
}

export class StoryController {
    private storyRepository: Repository<Story> = getRepository(Story);
    private sprintRepository: Repository<Sprint> = getRepository(Sprint);
    private projectRepository: Repository<Project> = getRepository(Project);

    async add(req: Request, res: Response, next: NextFunction) {
        const { projectId, sprintId } = req.params;
        const { storyFromClient }: StoryFromClient = req.body;

        try {
            let newStory = new Story;
            newStory.story_title = storyFromClient.storyTitle;
            newStory.story_category = storyFromClient.storyCategory;
            newStory.story_description = storyFromClient.storyDescription;
            newStory.story_order = storyFromClient.storyOrder;
            newStory.project = await this.projectRepository.findOne({
                where: {
                    project_id: projectId
                }
            });
            if (sprintId) {
                newStory.sprint = await this.sprintRepository.findOne({
                    where: {
                        project_id: projectId
                    }
                })
            }

            const response = await this.storyRepository
                .createQueryBuilder()
                .insert()
                .into(Story)
                .values(newStory)
                .execute();

            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

    async save(req: Request, res: Response, next: NextFunction) {
        const { projectId, sprintId, storyId } = req.params;
        const { storyFromClient }: StoryFromClient = req.body;

        try {
            const response = await this.storyRepository
                .createQueryBuilder()
                .update(Story)
                .set({
                    story_title: storyFromClient.storyTitle,
                    story_category: storyFromClient.storyCategory,
                    story_description: storyFromClient.storyDescription,
                    story_order: storyFromClient.storyOrder,
                    sprint: { sprint_id: sprintId }
                })
                .where({
                    project: { project_id: projectId },
                    story_id: storyId
                })
                .execute();
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const { projectId, storyId } = req.params;

        try {
            const response = await this.storyRepository
                .createQueryBuilder()
                .delete()
                .from(Story)
                .where({
                    story_id: storyId,
                    project: { project_id: projectId }
                })
                .execute();
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    }

    async one(req: Request, res: Response, next: NextFunction) {
        const { projectId, storyId } = req.params;

        try {
            const response = await this.storyRepository
                .createQueryBuilder()
                .select()
                .where({
                    story_id: storyId,
                    project: { project_id: projectId }
                })
                .getOne();
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    }

    async allByProjectId(req: Request, res: Response, next: NextFunction) {
        const { projectId } = req.params;

        try {
            const response = await this.storyRepository
                .createQueryBuilder()
                .select()
                .where({
                    project: { project_id: projectId }
                })
                .getMany();
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    }

    async allBySprintId(req: Request, res: Response, next: NextFunction) {
        const { projectId, sprintId } = req.params;

        try {
            const response = await this.storyRepository
                .createQueryBuilder()
                .select()
                .where({
                    sprint: { sprint_id: sprintId },
                    project: { project_id: projectId }
                })
                .getMany();
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    }
}