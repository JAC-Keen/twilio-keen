var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var KeenClient = require('keen-js');
var twilio = require('twilio');
var config = require('./config');

// TODO #1 - create an authenticated Keen analytics client
// Check https://github.com/keen/keen-js for help!

// YOUR CODE HERE
// var keen = ??????
// YOUR CODE HERE

// 2.) Create an Express web application
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// 3.) Create an endpoint to handle incoming calls from Twilio
app.post('/call', function(request, response) {
  
  // TODO #4 - Send an event to Keen tracking the incoming call
  keen.YOU_NEED_TO_CHANGE_THIS('calls', {
    number: request.body.To, // The twilio number that got the call
    city: request.body.YOU_NEED_TO_CHANGE_THIS // TODO: the city the call came from
  }, function(error, apiResponse) {

    // 5.) Return TwiML to provide instructions for what to do during the
    // inbound call

    // First, set the response Content-Type to XML
    response.type('text/xml');

    // Then, decide what message to read back to the user. If the Keen API
    // request was successful, then read back a happy message. If not, read
    // a sad message :(
    if (error) {
      console.log(error);
      return response.render('twiml', { message: 'Sorry, an error happened.' });
    }
    response.render('twiml', { message: 'Your call has been recorded!' })
  });
});

// 6.) Start web application
var server = http.createServer(app);
server.listen(process.env.PORT || 3000, function() {
  console.log('Express server started.');
});
