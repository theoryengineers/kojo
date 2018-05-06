import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { Auth } from "../entity/Auth";
import { Users } from "../entity/Users";

interface RegisterReq {
    fname: string;
    lname: string;
    displayname: string;
    password: string;
    email: string;
}

export class AuthController {

    private authRepository = getRepository(Auth);
    private usersRepository = getRepository(Users);

    async all(req: Request, res: Response, next: NextFunction) {
        return this.authRepository.find();
    }

    async one(req: Request, res: Response, next: NextFunction) {
        return this.authRepository.findOne(req.params.id);
    }

    async save(req: Request, res: Response, next: NextFunction) {
        const { fname, lname, displayname, password, email }: RegisterReq = req.body;

        try {
            // New user entry
            let newUser = new Users;
            newUser.fname = fname;
            newUser.lname = lname;
            newUser.displayname = displayname;
            newUser.email = email;

            // New auth entry
            let newAuth = new Auth;
            newAuth.email = email;
            newAuth.hash = await hashPass(password);

            // Establish one-to-one table relation
            newUser.auth = newAuth;

            await this.usersRepository.save(newUser)
                .then(res.status(200).json(newUser));
        } catch (err) {
            console.log("ERROR: ", err);
            res.status(400).json(err);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        await this.authRepository.remove(req.params.id);
    }

}

async function hashPass(password): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    })
};