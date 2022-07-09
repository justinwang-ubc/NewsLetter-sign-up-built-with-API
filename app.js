// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request =require("request");

const app = express();

app.use(express.static("public"));   // specify a static folder
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

   const firstname = req.body.fName;
   const lastname = req.body.lName;
   const email = req.body.email;

   const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us12.api.mailchimp.com/3.0/lists/a9c7dc87e3";
  const options = {
    method: "post",
    auth: "yiwang:c74ee90805635c9e611facbc5318898b-us12"
  };
  const request = https.request(url,options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  // request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});



app.listen(process.env.PORT || 3000, function(){
  console.log("the server is running on port 3000");
});

// api key
// c74ee90805635c9e611facbc5318898b-us12

//audicnece key
 //: a9c7dc87e3.
