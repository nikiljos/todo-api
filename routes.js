const router = require('express').Router();
const middleware=require("./middlewares")
const authController=require('./controllers/auth.controller')
const genericController=require("./controllers/generic.controller")
const todoController=require("./controllers/todo.controller")

router.get('/ping',genericController.handler)

router.post('/auth/signup',authController.signUp)
router.post("/auth/login", authController.login);

router.get("/user/detail",middleware.checkUser,genericController.userDetail)

router.get("/todo/list", middleware.checkUser, todoController.listTask);
router.post("/todo/add", middleware.checkUser, todoController.addTask);
router.put("/todo/:updateType", middleware.checkUser, todoController.updateTask);


module.exports=router