//* Path to resolve the client request

//* 1)import express
const express = require('express')

//* import controller
    const userController = require('../controllers/userController')
    //* import project controller
    const projectController = require('../controllers/projectController')
    //* imoport jwt middleware
    const jwtMiddleware = require('../Middleware/jwtMiddleware')

    //*import multer
    const multerConfig = require('../Middleware/multerMiddleware')

//* 2) Create a object for the class Router in express
const router = new express.Router()


//* 3) Logic or path for resolving the request
    //* Syntax - router.httprequest("path to resolve request ", () =>(how to resolve the request[inside controller]))
    //:a) Register
         router.post('/user/register',userController.register)

    //:b) login
        router.post('/user/login',userController.login)

    //:c) Add projects
        router.post('/projects/add',jwtMiddleware,multerConfig.single('projectimage'),projectController.addProject)

    //:getHomeProjects
        router.get('/projects/home-project',projectController.getHomeProjects)   

    //:getAllProjects
    router.get('/projects/all-project',jwtMiddleware,projectController.getAllProject)      
            
    //:getUserProjects
    router.get('/user/user-project',jwtMiddleware,projectController.getUserProject) 

    //:edit project
    router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('projectimage'),projectController.editUserProject)

    //:delete project 
    router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteUserProject)



//* 4) export router (connection establish with index.js)

module.exports = router