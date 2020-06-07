'use strict'
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);


global.participants = [];


app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cors())
    .use(morgan('dev'));

require('./socketEvents.js')(io);

// Routes
let r_chat  = require('./chat/r_chat');

app
	.use('/', r_chat);


http.listen(process.env.PORT || 3000, () => { });