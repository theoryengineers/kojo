import { UsersController } from "./controller/UsersController";
import { AuthController } from "./controller/AuthController";

const api = '/api/v1';

export const Routes = [
    // USERS
    {
        method: "get",
        route: api + "/users",
        controller: UsersController,
        action: "all"
    }, {
        method: "get",
        route: api + "/users/:id",
        controller: UsersController,
        action: "one"
    }, {
        method: "post",
        route: api + "/users",
        controller: UsersController,
        action: "save"
    }, {
        method: "delete",
        route: api + "/users",
        controller: UsersController,
        action: "remove"
    },

    // AUTH
    {
        method: 'post',
        route: api + '/register',
        controller: AuthController,
        action: 'save'
    }, {
        method: 'get',
        route: api + '/login',
        controller: AuthController,
        action: 'one'
    }
];