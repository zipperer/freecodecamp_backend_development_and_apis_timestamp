// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  let currentDate = new Date()
  res.json({
    unix : currentDate.getTime(),
    utc: currentDate.toUTCString()
  })
})

app.get("/api/:date", function (req, res) {
  let inputDate = req.params.date
  let inputDateParsed = new Date(inputDate)
  if (inputDateParsed == 'Invalid Date') {  // e.g. inputDate == '1451001600000' or inputDate == 'this-is-not-a-date'
    let inputDateAsIntOrNaN = parseInt(inputDate)
    if (isNaN(inputDateAsIntOrNaN)) { // e.g. inputDate == 'this-is-not-a-date'
        res.json({ error : "Invalid Date" })
      } else { // e.g. inputDate == '1451001600000'
        let inputDateAsInt = inputDateAsIntOrNaN
        let inputDateAsIntParsed = new Date(inputDateAsInt)
        let inputDateAsIntParsedToUTCString = inputDateAsIntParsed.toUTCString()
        res.json({
                  unix: inputDateAsInt,
                  utc: inputDateAsIntParsedToUTCString
        })
      }
  } else { // e.g. inputDate == 2016-12-25
      res.json({ utc: inputDateParsed.toUTCString(), 
                 unix: inputDateParsed.getTime()})
    }
  })

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
