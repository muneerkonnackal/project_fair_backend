//*import model 
const users = require('../Models/userSchema')

//*import jwt
const  jwt = require('jsonwebtoken')

//*Logic for register

exports.register = async (req,res)=>{
        //*logic
        console.log('inside user controller-register logic');
        //* destructuring data from the client request body (since json format is converted into javascript object by the .json() method used in index.js file)
        const {username, email , password} =req.body;
       try{ //*since email is the unique value we are checking that email is already present in the database 
             //* for that we are using findOne() method which return entire document when the condition true  Else returns Null.
                
                const existingUser = await users.findOne({email})
                if(existingUser){
                        //* if findOne return document it means that the user already exist
                        //* so we are sending a response in the 400 series (client request error )
                        res.status(406).json('Account already Exist ... please Login')

                }
                else{
                  //*if findOne returns a null, it means the email or the user  deosnot exist in the database 
                  //*we register the user

                //=1) Create object for the model
                  const newUser = new users({
                        username,
                        email,
                        password,
                        github:"",
                        linkedin:"",
                        profile:""
                  })
                  //=2) add the object use save() methodof mongoose

                  await newUser.save()

                     //*response
                      res.status(200).json(newUser)
                }
        } //* javascript resolve runtime error using try-catch block ( error varan chance ullathine try il kodukkum  athine resolvbe cheyyandath enganeyanannu catch il kodukkum )
        catch(err){
                res.status(401).json('Register request FAILED due to',err)
        }

       

}

//*logic for login

exports.login = async(req,res) => {
console.log('inside login function');

const {email,password} = req.body

        try{const existingUser = await users.findOne({email,password})

        if(existingUser){
                //* sign -> is the function used to create token
                //*first arg - payload - the information that is secretly transmitted
                //*second arg- secret key - based on which the token is generated

             const token = jwt.sign({userId : existingUser._id},"supersecretkey007007")
                res.status(200).json({
                        //* existing user enna key il aanu objectayi mukalil ulla existing userne vendath leftum right um vannath kond oru existing user ne koduthal mathy
                        //:jwt =>json web token : it defines a compact and selfcontained way for securely transmitting information between parties has json object (format is json object)

                        existingUser ,
                        token
                })
        }
        else{
              res.status(404).json('Invalid email or password')  
        }
        }catch(err){
        res.status(401).json('Login failed due to:',err)
        }


}

//: (err 406) -unprocessible entity 
//: javascript handle run time errors using try catch 
