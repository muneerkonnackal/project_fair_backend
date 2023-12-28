//*import mongoose

const mongoose = require('mongoose')

//*connection string of mongo db

const connectionString = process.env.DATABASE

//*Connect to mongoDB using mongoose 

mongoose.connect(connectionString).then(()=>{
    console.log('mongodb connected successfully');
}).catch((err)=>{
    console.log('mongodb connection failed due to :${err}');
})