//* import project schema
const projects = require('../Models/projectSchema')




//*Add projects 
exports.addProject = async (req,res)=>{
    console.log('inside addProject request');
    const userId = req.payload
    console.log(userId);


const projectimage = req.file.filename
// console.log(projectimage);
const {title,languages,github,website,overview} = req.body
console.log(`${title},${languages},${github},${website},${overview},${projectimage}`);
try{
    const existingProject = await projects.findOne({github})
    if(existingProject){
        res.status(406).json('project already exist...Upload New Project')
    }
    else{
        const newProject = new projects({
            title,languages,github,website,overview,projectimage,userId
        })
        await newProject.save()
        res.status(200).json(newProject)
    }

} catch (err){
    res.status(401).json(`request Failed Due to ${err}`)
}

//:Multer=>Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
//:Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form

 
}

//*GetHomeProject
exports.getHomeProjects = async(req,res)=>{
    

    try{
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)

    } catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}


//*getAllProject
exports.getAllProject = async(req,res)=>{
    const searchKey = req.query.search
    console.log(searchKey);
   
    const query={
        languages:{
            //regular expression,options => is the key used to remove case sensitive property
            $regex:searchKey, $options:'i'
        }
    }

    try{
        const allProject = await projects.find(query)
        res.status(200).json(allProject)

    } catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }

}

//*getUserProject

exports.getUserProject = async(req,res)=>{
    userId = req.payload
    console.log(userId);
    try{
        const allUserProject = await projects.find({userId})
        res.status(200).json(allUserProject)

    } catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }

}


//*edit project
exports.editUserProject = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {title,languages,github,website,overview,projectimage} = req.body
    const uploadProjectImage = req.file?req.file.filename:projectimage

    try{
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,languages,github,website,overview,projectimage:uploadProjectImage,userId},{new:true})

        await updateProject.save()
        res.status(200).json(updateProject)

    } catch(err){
        res.status(401).json(err)
    }
}

//*delete project
exports.deleteUserProject = async(req,res)=>{
    const {id} = req.params
    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)

    } catch(err){
        res.status(401).json(err)
    }
}

