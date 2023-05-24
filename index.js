const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require("cors");
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next();
})
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.port||5000
const mongoDB =require("./db");
mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors());
app.use('/api',require('./Routes/CreateUser'))
app.use('/api',require('./Routes/DisplayData'))
app.use('/api',require('./Routes/OrderData'))
app.listen(port, () => { 
  console.log(`Example app listening on port ${port}`)
})