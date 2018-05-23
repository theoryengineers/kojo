import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async all(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.userRepository
                .createQueryBuilder("user")
                .select()
                .getMany();
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

    async one(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params;
        try {
            const response = await this.userRepository
                .createQueryBuilder()
                .select()
                .where({ user_id: userId })
                .getOne()
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

    async save(req: Request, res: Response, next: NextFunction) {
        return this.userRepository.save(req.body);
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const response = await this.userRepository
                .createQueryBuilder()
                .delete()
                .from(User)
                .where({
                    user_id: id
                })
                .execute()
            res.status(200).json(response)
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
        
    }

}