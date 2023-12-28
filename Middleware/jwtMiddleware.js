//* import jwt

const jwt = require('jsonwebtoken')

const jwtMiddleware= (req,res,next)=>{
    console.log('inside jwt middleware');
    //*Logic
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);
    
try{
    //* First argument should be the token and the second argument shoulkd be the secret key
    const jwtResponse = jwt.verify(token,'supersecretkey007007')
    console.log(jwtResponse);
    req.payload = jwtResponse.userId
    next()

    // const jwtResponse = jwt.verify(token,"supersecretkey007007")
    // console.log(jwtResponse);
    // req.payload = jwtResponse.userId
    // next()

} catch (err){
    res.status(401).json("Authorization Failed ... Please Login")
}

}

module.exports = jwtMiddleware