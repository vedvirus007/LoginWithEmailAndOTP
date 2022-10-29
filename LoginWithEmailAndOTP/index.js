const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const ejs = require("ejs")

app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", 'ejs')
app.use(express.static("public"))

var initialSec, initialHour, initialMin, email;

app.get('/', function (req, res) {
    res.render('home')
})

app.get('/logout', function (req, res) {
    res.redirect('/');
})

app.get('/login', function (req, res) {
    res.render('login');
})

app.post('/login', function (req, res) {
    email = req.body.email;
    console.log("Your email is: " + email)
    otp = Math.floor(Math.random() * 9000) + 1000;
    const d = new Date();
    initialSec = d.getSeconds();
    initialMin = d.getMinutes();
    initialHour = d.getHours();
    console.log("Your otp is: " + otp + ". This is valid for only 30 seconds.")
    res.render('OTP');
})

app.post('/OTP', function (req, res) {
    otp = req.body.otp;
    const d = new Date();
    presentSec = d.getSeconds();
    presentMin = d.getMinutes();
    presentHour = d.getHours();
    var lapsedTime = (presentHour - initialHour) * 3600 + (presentMin - initialMin) * 60 + (presentSec - initialSec);

    if (lapsedTime <= 30) {
        res.render('logged', { email: email });
    } else {
        res.redirect('/getAnotherOtp');
    }

})

app.get('/getAnotherOtp', function (req, res) {
    res.render('getAnotherReq');
})

let port = process.env.PORT;
if (port == "" || port == null) {
    port = 3000;
}

app.listen(port, function () {
    console.log("Server Running Up")
})