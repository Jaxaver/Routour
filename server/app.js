require('dotenv').config();


const express = require('express');
const path = require('path');


const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
require('./configs/mongoose.config')
require('./configs/middlewares.config')(app)
require('./configs/session.config')(app);
require('./configs/view-engine.config')(app)

// Express View engine setup





app.locals.title = 'Routour';


// Hojas de rutas
// const index = require('./routes/index');
// app.use('/', index);

const auth = require('./routes/auth.routes');
app.use('/api/auth', auth);
const exp = require('./routes/map.routes');
app.use('/map', exp);

app.use((req, res) => { res.sendFile(__dirname + "/public/index.html"); })


module.exports = app;
