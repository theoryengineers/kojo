import "reflect-metadata";
import { createConnection, Repository, Connection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { Auth } from "./entity/Auth";
import { hashPass } from './controller/AuthController';

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    const port = 5500;
    app.listen(port);

    // insert new users for test
    await newUser(connection);

    console.log(`Express server has started on port ${port}. Open http://localhost:8080/users to see results`);
    console.log('email: simon.cowell@gmail.com\npass: bacon');

}).catch(error => console.log(error));


async function newUser(connection: Connection) {
    let newUser = new User;
    newUser.fname = 'Simon';
    newUser.lname = 'Cowell';
    newUser.displayname = 'Owl Hater';
    newUser.email = 'simon.cowell@gmail.com';
    newUser.joined = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

    let newAuth = new Auth;
    newAuth.email = 'simon.cowell@gmail.com';
    newAuth.hash = await hashPass('bacon');

    newUser.auth = newAuth;

    let userRepository: Repository<User> = connection.getRepository(User);

    await userRepository.save(newUser);
}