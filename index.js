const express=require('express');
const app = express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const userRoute=require('./routes/user')
const authRoute=require('./routes/auth')

dotenv.config();
mongoose.connect(process.env.MONGOOSE_URL)
.then(()=>{console.log('DB connection sucsesfully')})
.catch((err)=>{console.log(err);
})
app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);


app.listen(5000,()=>{
    console.log('hello')
})