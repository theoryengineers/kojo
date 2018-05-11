# AUTHORIZATION
## Register

> **Method**: POST

> **Route**: /api/v1/register

|Input|Description|
|-|
|`fname`|First name|
|`lname`|Last name|
|`displayname`|Display Name|
|`password`|Password|
|`email`|Email|

#### Expected Ouput
```
[
    {
        "fname": "Bacon",
        "lname": "Lord",
        "displayname": "Lord of Bacon",
        "email": "Bacon@gmail.com",
        "joined": "5/11/2018, 6:59:06 PM",
        "user_id": 2
    },
    {
        "project_name": "Initial Project",
        "created_on": "5/11/2018, 6:59:06 PM",
        "assignment": [
            {
                "user": {
                    "fname": "Bacon",
                    "lname": "Lord",
                    "displayname": "Lord of Bacon",
                    "email": "Bacon@gmail.com",
                    "joined": "5/11/2018, 6:59:06 PM",
                    "user_id": 2
                },
                "user_role": "Lead"
            }
        ],
        "project_id": 1
    }
]
```

## Login
```
Method: POST
Route: /api/v1/login
```
|Input|Description|
|-|
|`email`|Email|
|`password`|Password|

#### Expected Output
```
{
    "user_id": 2,
    "fname": "Bacon",
    "lname": "Lord",
    "displayname": "Lord of Bacon",
    "email": "Bacon@gmail.com",
    "joined": "5/11/2018, 7:42:36 PM"
}
```

# USER
## Get All Users
```
Method: GET
Route: /api/v1/users
```
#### Expected Output
```
[
    {
        "user_id": 1,
        "fname": "Simon",
        "lname": "Cowell",
        "displayname": "Owl Hater",
        "email": "simon.cowell@gmail.com",
        "joined": "5/11/2018, 7:42:33 PM"
    },
    {
        "user_id": 2,
        "fname": "Bacon",
        "lname": "Lord",
        "displayname": "Lord of Bacon",
        "email": "Bacon@gmail.com",
        "joined": "5/11/2018, 7:42:36 PM"
    }
]
```


## Get User By ID
```
Method: GET
Route: /api/v1/user/:userid
```
#### Expected Output
```
{
    "user_id": 2,
    "fname": "Bacon",
    "lname": "Lord",
    "displayname": "Lord of Bacon",
    "email": "Bacon@gmail.com",
    "joined": "5/11/2018, 7:42:36 PM"
}
```
## Remove User By ID
```
Method: DELETE
Route: /api/v1/user/:userid
```
# PROJECT
## Add New Project
```
Method: POST
Route: /api/v1/project/user/:userid
```
|Input|Description|
|-|
|`projectName`|Project Name|

#### Expected Output
```
{
    "project_name": "New Project",
    "created_on": "5/11/2018, 7:54:32 PM",
    "assignment": [
        {
            "user": {
                "user_id": 1,
                "fname": "Simon",
                "lname": "Cowell",
                "displayname": "Owl Hater",
                "email": "simon.cowell@gmail.com",
                "joined": "5/11/2018, 7:54:17 PM"
            },
            "user_role": "Lead"
        }
    ],
    "project_id": 1
}
```

## Edit Project By ID
```
Method: PUT
Route: /api/v1/project/:projectid
```
|Input|Description|
|-|
|`projectName`|Project Name|

#### Expected Output
```
{
    "generatedMaps": [],
    "raw": []
}
```

## Delete Project By ID
```
Method: DELETE
Route: /api/v1/project/:projectid
```
## Get Project By ID
```
Method: GET
Route: /api/v1/project/:projectid
```
#### Expected Output
```
{
    "project_id": 1,
    "project_name": "New Edit Project",
    "created_on": "5/11/2018, 7:54:32 PM",
    "assignment": [
        {
            "user_role": "Lead",
            "user": {
                "user_id": 1,
                "fname": "Simon",
                "lname": "Cowell",
                "displayname": "Owl Hater",
                "email": "simon.cowell@gmail.com",
                "joined": "5/11/2018, 7:54:17 PM"
            }
        }
    ],
    "sprint": [],
    "story": []
}
```

## Get All Projects
```
Method: GET
Route: /api/v1/projects
```

#### Expected Output

```
[
    {
        "project_id": 1,
        "project_name": "New Edit Project",
        "created_on": "5/11/2018, 7:54:32 PM",
        "assignment": [
            {
                "user_role": "Lead",
                "user": {
                    "user_id": 1,
                    "fname": "Simon",
                    "lname": "Cowell",
                    "displayname": "Owl Hater",
                    "email": "simon.cowell@gmail.com",
                    "joined": "5/11/2018, 7:54:17 PM"
                }
            }
        ],
        "sprint": [],
        "story": []
    },
    {
        "project_id": 3,
        "project_name": "Initial Project",
        "created_on": "5/11/2018, 7:59:35 PM",
        "assignment": [
            {
                "user_role": "Lead",
                "user": {
                    "user_id": 2,
                    "fname": "Bacon",
                    "lname": "Lord",
                    "displayname": "Lord of Bacon",
                    "email": "Bacon@gmail.com",
                    "joined": "5/11/2018, 7:59:35 PM"
                }
            }
        ],
        "sprint": [],
        "story": []
    },
    {
        "project_id": 4,
        "project_name": "qw qwe Project",
        "created_on": "5/11/2018, 7:59:41 PM",
        "assignment": [
            {
                "user_role": "Lead",
                "user": {
                    "user_id": 2,
                    "fname": "Bacon",
                    "lname": "Lord",
                    "displayname": "Lord of Bacon",
                    "email": "Bacon@gmail.com",
                    "joined": "5/11/2018, 7:59:35 PM"
                }
            }
        ],
        "sprint": [],
        "story": []
    },
    {
        "project_id": 5,
        "project_name": "2 Project",
        "created_on": "5/11/2018, 8:00:00 PM",
        "assignment": [
            {
                "user_role": "Lead",
                "user": {
                    "user_id": 1,
                    "fname": "Simon",
                    "lname": "Cowell",
                    "displayname": "Owl Hater",
                    "email": "simon.cowell@gmail.com",
                    "joined": "5/11/2018, 7:54:17 PM"
                }
            }
        ],
        "sprint": [],
        "story": []
    }
]
```

## Get All Projects By User ID
```
Method: GET
Route: /api/v1/projects/user/:userid
```

#### Expected Output
```
[
    {
        "project_id": 5,
        "project_name": "2 Project",
        "created_on": "5/11/2018, 8:00:00 PM",
        "assignment": [
            {
                "user_role": "Lead",
                "user": {
                    "user_id": 1,
                    "fname": "Simon",
                    "lname": "Cowell",
                    "displayname": "Owl Hater",
                    "email": "simon.cowell@gmail.com",
                    "joined": "5/11/2018, 7:54:17 PM"
                }
            }
        ],
        "sprint": [],
        "story": []
    },
    {
        "project_id": 1,
        "project_name": "New Edit Project",
        "created_on": "5/11/2018, 7:54:32 PM",
        "assignment": [
            {
                "user_role": "Lead",
                "user": {
                    "user_id": 1,
                    "fname": "Simon",
                    "lname": "Cowell",
                    "displayname": "Owl Hater",
                    "email": "simon.cowell@gmail.com",
                    "joined": "5/11/2018, 7:54:17 PM"
                }
            }
        ],
        "sprint": [],
        "story": []
    }
]
```

# PROJECT ASSIGNMENT
## Assign User(s) ID to Project ID
```
Method: POST
Route: /api/v1/project/:projectid/assign
```
|Input|Description|
|-|
|`newUsers[]`|Array of new users by ID|

## Remove User(s) ID from Project ID
```
Method: DELETE
Route: /api/v1/project/:projectid/assign
```
|Input|Description|
|-|
|`delUsers[]`|Array of deleting users by ID|
## Get All Assignments by Project ID
```
Method: GET
Route: /api/v1/project/:projectid/assign
```

# PROJECT SPRINT
## Add Sprint By Project ID
```
Method: POST
Route: /api/v1/project/:projectid/sprint
```
|Input|Description|
|-|
|`sprintName`|Sprint Name|
|`sprintDescription`|Sprint Description|
## Edit Sprint By Project and Sprint ID
```
Method: PUT
Route: /api/v1/project/:projectid/sprint/:sprintid
```
|Input|Description|
|-|
|`sprintName`|Sprint Name|
|`sprintDescription`|Sprint Description|
## Delete Sprint By Project and Sprint ID
```
Method: DELETE
Route: /api/v1/project/:projectid/sprint/:sprintid
```
## Get Sprint By Project and Sprint ID
```
Method: GET
Route: /api/v1/project/:projectid/sprint/:sprintid
```
## Get All Sprints By Project ID
```
Method: GET
Route: /api/v1/project/:projectid/sprints
```

# STORY/TASK
## Add Story By Project ID
```
Method: POST
Route: /api/v1/project/:projectid/story
```
|Input|Description|
|-|
|`storyFromClient.storyTitle`|Story Title|
|`storyFromClient.storyCategory`|Story Category, i.e., "API", "Frontend", "Database"|
|`storyFromClient.storyDescription`|Story Description|
|`storyFromClient.storyOrder`|Story Index Order|
## Edit Story By Project, Sprint, and Story ID
```
Method: PUT
Route: /api/v1/project/:projectid/sprint/:sprintid/story/:storyid
```
|Input|Description|
|-|
|`storyFromClient.storyTitle`|Story Title|
|`storyFromClient.storyCategory`|Story Category, i.e., "API", "Frontend", "Database"|
|`storyFromClient.storyDescription`|Story Description|
|`storyFromClient.storyOrder`|Story Index Order|
## Delete Story By Project and Story ID
```
Method: DELETE
Route: /api/v1/project/:projectid/story/:storyid
```
## Get Story By Project and Story ID
```
Method: GET
Route: /api/v1/project/:projectid/story/:storyid
```
## Get All Stories By Project ID
```
Method: GET
Route: /api/v1/project/:projectid/stories
```
## Get All Stories By Project and Sprint ID
```
Method: GET
Route: /api/v1/project/:projectid/sprint/:sprintid/stories
```