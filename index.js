// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  var unix;
  var utc;
  var json;

  if (req.params.date) {
    var date = new Date(req.params.date);

    if (!isNaN(date)) {
      console.log(date);
      unix = Math.floor(date.getTime());
      utc = date.toUTCString();
      json = { unix: unix, utc: utc };
    } else if (!isNaN(new Date(Number(req.params.date)))) {
      unix = Number(req.params.date);
      utc = new Date(Number(req.params.date)).toUTCString();
      json = { unix: unix, utc: utc };
    } else {
      json = { error: "Invalid Date" };
    }
  } else {
    var date = new Date();
    unix = Math.floor(date.getTime());
    utc = date.toUTCString();
    json = { unix: unix, utc: utc };
  }

  res.json(json);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
