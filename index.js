
//: 1) import dotenv
//* Loads .env file contents into process.env by default. 

require('dotenv').config()

//: 2) import express  - to create server
const express = require('express')

//: 3) import cors
const cors = require('cors')

//: import router
const router = require('./Routes/router')

//: import connections.js / mongoose 
require('./DB/connections')

//: 4) create server  -Creates an Express application. The express() function is a top-level function exported by the express module.
const pfServer = express()

//: 5) use of cors by server
pfServer.use(cors())



//: 6) retuns middleware that only passes json and convert it into javascript object
pfServer.use(express.json())

//:server use router
   pfServer.use(router)

//:pf-server should use uploads
//*first arg -how the other application should use this file
//*second arg - to export the upload folder
pfServer.use('/uploads',express.static('./uploads'))   


//: 7) custom the port - why because  by default server runs at - 3000
const PORT = 4000 || process.env.PORT

//: 8) Run server 
pfServer.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

//: get http request to base url('/') -http://localhost:4000

pfServer.get('/',(req,res)=>{
    res.send(`<h1 style="color:red"><span style="color:black">project fair</span> server running successfully and waiting for client request</h1>`)
})


// // post request 

// pfServer.post('/',(req,res)=>{
//     res.send('post request')
// })

// // put request 

// pfServer.put('/',(req,res)=>{
//     res.send('put request')
// })

