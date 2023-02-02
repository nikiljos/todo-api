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

Sample Response | 200
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

### GET `/todo/report`
### POST `/todo`
### PUT `/todo/pending`
### PUT `/todo/complete`
### PUT `/todo/cancel`
### DELETE `/todo`
