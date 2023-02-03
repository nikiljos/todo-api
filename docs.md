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
            "formatted": "task def (✗) []"
        },
        {
            "id": "63dc023537929165cb38663d",
            "title": "task efg",
            "status": "complete",
            "formatted": "task efg (✓) []"
        },
        {
            "id": "63dc031a37929165cb386655",
            "title": "task efg",
            "status": "pending",
            "formatted": "task efg (-) []"
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
                    "title": "task efg",
                    "status": "pending",
                    "_id": "63dc031a37929165cb386655"
                }
            ],
            "cancel": [
                {
                    "title": "task def",
                    "status": "cancel",
                    "_id": "63dc022e37929165cb38663a"
                }
            ],
            "complete": [
                {
                    "title": "task efg",
                    "status": "complete",
                    "_id": "63dc023537929165cb38663d"
                }
            ]
        },
        "count": {
            "pending": 1,
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
