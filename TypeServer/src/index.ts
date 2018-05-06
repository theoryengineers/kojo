import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { Users } from "./entity/Users";

createConnection().then(async connection => {

    // create express app
    const app = express();
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
    app.listen(5500);

    // insert new users for test

    let newUser = new Users;

    newUser.fname = 'Timber';
    newUser.lname = 'Saw';
    newUser.displayname = 'Timer';
    newUser.email = 'bacon@gmail.com';

    let usersRespository = connection.getRepository(Users)

    await usersRespository.save(newUser);

    console.log("Express server has started on port 8080. Open http://localhost:8080/users to see results");

}).catch(error => console.log(error));
