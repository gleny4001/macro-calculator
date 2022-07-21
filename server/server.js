const express = require('express');
const port = 4000;
const app = express(); 
const cors = require('cors');

app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());

app.get("/", cors(), (req, res) => {
  res.send("working")});

app.post("/formData", (req, res) =>{
  const newData = req.body;
  console.log(newData);
  
})

app.listen({port}, ()=>{console.log('listening on port ' + port)});