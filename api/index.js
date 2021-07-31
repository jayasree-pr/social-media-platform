const express = require ('express');
const dotenv = require ('dotenv');
const helmet = require ('helmet');
const morgan = require ('morgan');
const mongoose = require ('mongoose');
const userRoute = require('./router/users.js');
const authRoute = require('./router/auth.js');
const postRoute = require('./router/Posts.js');
const app = express();
const bodyparser = require('body-parser');
const url = "mongodb://127.0.0.1:27017/socialmedia";

dotenv.config();

mongoose.connect(url,{useNewUrlParser:true},()=>{
    console.log("db connected!");
});

app.use(bodyparser.urlencoded({extended:true}));
var cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(helmet());
app.use(morgan("common")); 

app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute);

app.get('/users',(req,res)=>{
    res.send('welcome usrs');
})

app.listen(4000,()=>{
    console.log("server is running..");
})