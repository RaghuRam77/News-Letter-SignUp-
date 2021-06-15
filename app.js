const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
  app.use(bodyparser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});



app.post("/" ,function(req,resp){
    
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.mail;
var data = {
    members:[
        {
            email_address :email,
            status: "subscribed",
            merge_fields:{
                FNAME :firstName,
                LNAME: lastName
            }
        }
     
    ]

};
const jsonData =JSON.stringify(data);
const url = "https://us6.api.mailchimp.com/3.0/lists/efb4f955e2";
const options ={
    method: "POST",
    auth : "raghu:291f906fa9d94230437fc45a1bb6b191-us6"
}

const request = https.request(url , options, function(response){

if(response.statusCode===200){
   resp.sendFile(__dirname +"/success.html");
}
else {
    resp.sendFile(__dirname+"/failure.html");
}
response.on("data",function(data){

    console.log(JSON.parse(data));
});
});
request.write(jsonData);
request.end();


});




app.post("/failure.html",function(req,res){
    res.redirect("/");

})













app.listen(process.env.PORT || 3000, function(){
    console.log("server is running at port  3000");
});




