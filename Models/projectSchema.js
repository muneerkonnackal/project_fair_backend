//* import mongoose 

const mongoose = require('mongoose')

//*create scheme - use schema class in mongoose 

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        require : true,
        // min:['3','Must be atleast 3 characters, got only {value}',]
    },
    languages:{
        type: String,
        require : true,
    },
    github:{
        type: String,
        require:true
    },
    website:{
        type: String,
        require:true
    },
    overview:{
        type: String,
        require:true
    }, 
    projectimage:{
        type: String,
        require:true
    },
    userId:{
        type:String,
        require:true
    }

})


const projects = mongoose.model("projects",projectSchema)

module.exports = projects

//middlewares has the   : doing a task before going to logical operation
//there are 2 types of middlewares 
//1.application middleware :  //:specify in index.js
//2. router specific middlewares : particular path il req vannale  9.53//:specify in router