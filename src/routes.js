const router = require('express').Router();
const middleware=require("./middlewares")
const authController=require('./controllers/auth.controller')
const genericController=require("./controllers/generic.controller")
const todoController=require("./controllers/todo.controller")

router.get('/ping',genericController.handler)
router.get("/tryout", genericController.frontendRedirect);

router.post('/auth/signup',authController.signUp)
router.post("/auth/login", authController.login);

router.get("/user/detail",middleware.checkUser,genericController.userDetail)

router.get("/todo/list", middleware.checkUser, todoController.listTask);
router.get("/todo/report", middleware.checkUser, todoController.summarizeTask);
router.post("/todo", middleware.checkUser, todoController.addTask);
router.put("/todo/:updateType", middleware.checkUser, todoController.updateTask);
router.delete("/todo", middleware.checkUser, todoController.deleteTask);


module.exports=router