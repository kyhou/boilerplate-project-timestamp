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
app.get("/api/:time", function (req, res) {
  var unix;
  var utc;
  var json;

  if (req.params.time) {
    var time = new Date(req.params.time);

    if (!isNaN(time)) {
      unix = Math.floor(time.getTime() / 1000);
      utc = time.toUTCString();
      json = { unix: unix, utc: utc };
    } else if (!isNaN(new Date(req.params.time * 1000))) {
      unix = Number(req.params.time);
      utc = new Date(req.params.time * 1000).toUTCString();
      json = { unix: unix, utc: utc };
    } else {
      json = { error: "Invalid Date" };
    }
  } else {
    var time = new Date();
    unix = Math.floor(time.getTime() / 1000);
    utc = time.toUTCString();
    json = { unix: unix, utc: utc };
  }

  res.json(json);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
