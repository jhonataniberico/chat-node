'use strict'

const express = require('express'),
    ctrl      = require('./c_chat'),
    api       = express.Router();

api
    .get('/participants'   , ctrl.participants)

module.exports = api;