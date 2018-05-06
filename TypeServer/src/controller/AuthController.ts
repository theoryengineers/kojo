import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { Auth } from "../entity/Auth";
import { User } from "../entity/User";

interface RegisterReq {
    fname: string;
    lname: string;
    displayname: string;
    password: string;
    email: string;
}

export class AuthController {

    private authRepository: Repository<Auth> = getRepository(Auth);
    private userRepository: Repository<User> = getRepository(User);

    async all(req: Request, res: Response, next: NextFunction) {
        return this.authRepository.find();
    }

    async one(req: Request, res: Response, next: NextFunction) {
        try {
            // Find auth entry based on res.body.email
            const auth: Auth = await this.authRepository.findOne({ email: req.body.email });

            // Does Password match?
            const isValid: boolean = await compareHash(req.body.password, auth.hash);

            if (isValid) {
                // Response OK
                const user: User = await this.userRepository.findOne({ user_id: auth.user_id });
                res.status(200).json(user);
            } else {
                // Response ERR
                res.status(401).json('User and Password Mismatch');
            }
        } catch (err) {
            res.status(401).json('User does not exist');
        }
    }

    async add(req: Request, res: Response, next: NextFunction) {
        const {
            fname,
            lname,
            displayname,
            password,
            email
        }: RegisterReq = req.body;

        try {
            // New user entry
            let newUser = new User;
            newUser.fname = fname;
            newUser.lname = lname;
            newUser.displayname = displayname;
            newUser.email = email;
            newUser.joined = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

            // New auth entry
            let newAuth = new Auth;
            newAuth.email = email;
            newAuth.hash = await hashPass(password);

            // Establish one-to-one table relation
            newUser.auth = newAuth;

            await this.userRepository.save(newUser)
                .then(() => res.status(200).json(newUser));
        } catch (err) {
            console.log("ERROR: ", err);
            res.status(400).json(err);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        await this.authRepository.remove(req.params.id);
    }

}

export async function hashPass(password): Promise<string> {
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

export async function compareHash(reqPass: string, hash: string): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(reqPass, hash, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    })
};