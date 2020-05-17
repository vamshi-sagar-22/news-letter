const express = require("express");
const app = express();
const bp = require("body-parser")
const request = require("request")
app.use(express.static('public'))
const https = require('https')
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/sign-up.html")
})
app.use(bp.urlencoded({
  extended: true
}))
app.post("/", function(req, res) {
  const fn = req.body.fName;
  const ln = req.body.lName;
  var email = req.body.email;
  console.log(email);
  const data = {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fn,
        LNAME: ln
      }

  }
  const jdata = JSON.stringify(data);

  const url = "https://us18.api.mailchimp.com/3.0/lists/xxxxxxx/members"
  const options = {
    method: 'POST',
    auth: "vamshi:xxxxxxxxxxxxxxx"
  }
  const request = https.request(url, options, function(response) {
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html")
    }
    else{
      res.sendFile(__dirname+"/failure.html")
    }
    console.log(response);
    response.on('data', function(data) {
    console.log(JSON.parse(data));
    })
  })
  request.write(jdata)
  request.end()
})
app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
})

