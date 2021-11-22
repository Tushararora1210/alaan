const express = require('express');
const axios = require('axios');
const { response } = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Running");
})
app.get('/getAllUserDetails',(req,res)=>{
axios.get('https://randomuser.me/api/?results=10')
.then(response=>{
    console.log("Results are",response.data.results);
    let output = [];
    let newUser ={};
    for(let i=0; i<response.data.results.length;i++){
        newUser = {};
        newUser["name"] = response.data.results[i].name.title +" "+ response.data.results[i].name.first + " "+response.data.results[i].name.last;
        newUser["city"] = response.data.results[i].city;
        newUser["phone"] = response.data.results[i].phone;
        newUser["email"] = response.data.results[i].email;
        newUser["thumbnailImg"] = response.data.results[i].picture.thumbnail;
        output = [...output,newUser];
    }

    res.json({data:output});
})
.catch(err=>{
    console.log(err);
})
})

app.listen(4200,()=>{
    console.log("Server Started");
})