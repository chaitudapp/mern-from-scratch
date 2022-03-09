const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()
const authRoutes = require("./routes/authentication")

const userRoutes = require("./routes/user");


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
 }).then(() => {
     console.log("DB CONNECTED")
 });



const port = process.env.PORT ;

const app = express();
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors());



app.use("/api",authRoutes);

app.use("/api",userRoutes);

app.get('/',(req, res) => {
    res.send("Hello user");
})

app.get('/users/:name',(req,res) => {
    res.send(req.params.name + " "+"is using instagram");
}
)


app.listen(port,() => {
    console.log(`${port}`);
})