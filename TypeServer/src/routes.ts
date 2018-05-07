import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";
import { ProjectController } from "./controller/ProjectController";
import { Project } from "./entity/Project";
import { ProjectAssignmentController } from "./controller/ProjectAssignmentController";
import { ProjectSprintController } from "./controller/ProjectSprintController";
import { StoryController } from "./controller/StoryController";

const api = '/api/v1';

export const Routes = [
    // AUTH
    {
        method: 'post',
        route: api + '/register',
        controller: AuthController,
        action: 'add'
    }, {
        method: 'post',
        route: api + '/login',
        controller: AuthController,
        action: 'one'
    },

    // USER
    {
        method: "get",
        route: api + "/users",
        controller: UserController,
        action: "all"
    }, {
        method: "get",
        route: api + "/user/:userId",
        controller: UserController,
        action: "one"
    }, {
        method: "post",
        route: api + "/user",
        controller: UserController,
        action: "add"
    }, {
        method: "delete",
        route: api + "/user/:userId",
        controller: UserController,
        action: "remove"
    },

    // PROJECT
    {
        method: "post",
        route: api + "/project",
        controller: ProjectController,
        action: "add"
    }, {
        method: "put",
        route: api + "/project/:projectId",
        controller: ProjectController,
        action: "save"
    }, {
        method: "delete",
        route: api + "/project/:projectId",
        controller: ProjectController,
        action: "remove"
    }, {
        method: "get",
        route: api + "/project/:projectId",
        controller: ProjectController,
        action: "one"
    }, {
        method: "get",
        route: api + "/projects",
        controller: ProjectController,
        action: "all"
    }, {
        method: "get",
        route: api + "/projects/user/:userId",
        controller: ProjectController,
        action: "allByUserId"
    },

    // PROJECT ASSIGNMENT
    {
        method: "post",
        route: api + "/project/:projectId/assign",
        controller: ProjectAssignmentController,
        action: "add"
    }, {
        method: "delete",
        route: api + "/project/:projectId/assign",
        controller: ProjectAssignmentController,
        action: "remove"
    }, {
        method: "get",
        route: api + "/project/:projectId/assign",
        controller: ProjectAssignmentController,
        action: "allByProjectId"
    },

    // PROJECT SPRINT
    {
        method: "post",
        route: api + "/project/:projectId/sprint",
        controller: ProjectSprintController,
        action: "add"
    }, {
        method: "put",
        route: api + "/project/:projectId/sprint/:sprintId",
        controller: ProjectSprintController,
        action: "save"
    }, {
        method: "delete",
        route: api + "/project/:projectId/sprint/:sprintId",
        controller: ProjectSprintController,
        action: "remove",
    }, {
        method: "get",
        route: api + "/project/:projectId/sprint/:sprintId",
        controller: ProjectSprintController,
        action: "one"
    }, {
        method: "get",
        route: api + "/project/:projectId/sprints",
        controller: ProjectSprintController,
        action: "allByProjectId"
    },

    // STORY/TASK
    {
        method: "post",
        route: api + "/project/:projectId/story",
        controller: StoryController,
        action: "add"
    }, {
        method: "put",
        route: api + "/project/:projectId/sprint/:sprintId/story/:storyId",
        controller: StoryController,
        action: "save"
    }, {
        method: "delete",
        route: api + "/project/:projectId/story/:storyId",
        controller: StoryController,
        action: "remove",
    }, {
        method: "get",
        route: api + "/project/:projectId/story/:storyId",
        controller: StoryController,
        action: "one"
    }, {
        method: "get",
        route: api + "/project/:projectId/stories",
        controller: StoryController,
        action: "allByProjectId"
    }, {
        method: "get",
        route: api + "/project/:projectId/sprint/:sprintId/stories",
        controller: StoryController,
        action: "AllBySprintId"
    }
];