# API Doc

### POST `/auth/signup`

#### Body
```
{
    "name":"nikhil",
    "email":"email@example.com",
    "password":"P@ssw0rd"
}
```

#### Sample Response | 200
```
{
    "status": true,
    "message": "SignUp Successfull",
    "data": {
        "accessToken": "user_jwt_toekn_here"
    }
}
```

### POST `/auth/login`
#### Body
```
{
    "email":"email@example.com",
    "password":"P@ssw0rd"
}
```

#### Sample Response | 200
```
{
    "status": true,
    "data": {
        "accessToken": "user_jwt_toekn_here"
    }
}
```

### GET `/todo/list`
Lists all tasks
#### Header
```
Authorization: Bearer <auth_token>
```
#### Sample Response | 200
```
{
    "status": true,
    "data": [
        {
            "id": "63dc022e37929165cb38663a",
            "title": "task def",
            "status": "cancel",
            "priority": null,
            "formatted": "task def (✗) []"
        },
        {
            "id": "63dc023537929165cb38663d",
            "title": "task efg",
            "status": "complete",
            "priority": null,
            "formatted": "task efg (✓) []"
        },
        {
            "id": "63dc031a37929165cb386655",
            "title": "task efg",
            "status": "pending",
            "priority": null,
            "formatted": "task efg (-) []"
        },
        {
            "id": "63dca24ff7012af55bb84b66",
            "title": "task zz",
            "status": "pending",
            "priority": 9,
            "formatted": "task zz (-) [9]"
        }
    ]
}
```

### GET `/todo/report`
Report of tasks based on status
#### Header
```
Authorization: Bearer <auth_token>
```
#### Sample Response | 200
```
{
    "status": true,
    "data": {
        "details": {
            "pending": [
                {
                    "id": "63dc031a37929165cb386655",
                    "title": "task efg",
                    "priority": null
                },
                {
                    "id": "63dca24ff7012af55bb84b66",
                    "title": "task zz",
                    "priority": 9
                }
            ],
            "cancel": [
                {
                    "id": "63dc022e37929165cb38663a",
                    "title": "task def",
                    "priority": null
                }
            ],
            "complete": [
                {
                    "id": "63dc023537929165cb38663d",
                    "title": "task efg",
                    "priority": null
                }
            ]
        },
        "count": {
            "pending": 2,
            "cancel": 1,
            "complete": 1,
            "delete": 1
        }
    }
}
```

### POST `/todo`
Add a task
#### Header
```
Authorization: Bearer <auth_token>
```
#### Body
```
{
    "title":"task 123",
    "priority":2
}
```
### PUT `/todo/pending`
Mark a task as pending
#### Header
```
Authorization: Bearer <auth_token>
```
#### Body
```
{
    "taskId":"63dc023537929165cb38663d"
}
```
### PUT `/todo/complete`
Mark a task as completed
#### Header
```
Authorization: Bearer <auth_token>
```
#### Body
```
{
    "taskId":"63dc023537929165cb38663d"
}
```
### PUT `/todo/cancel`
Mark a task as cancelled
#### Header
```
Authorization: Bearer <auth_token>
```
#### Body
```
{
    "taskId":"63dc023537929165cb38663d"
}
```
### DELETE `/todo`
Delete a task
#### Header
```
Authorization: Bearer <auth_token>
```
#### Body
```
{
    "taskId":"63dc023537929165cb38663d"
}
```
