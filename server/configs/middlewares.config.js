const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const cors = require('cors')


// CORS CONFIG
const whitelist = ['http://localhost:3000', 'http://localhost:5000']
const corsOptions = {
    origin: (origin, cb) => {
        const originIsWhitelisted = whitelist.includes(origin)
        cb(null, originIsWhitelisted)
    },
    credentials: true        // RUTAS PERSISTENTES
}

module.exports = app => {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser())

    // CORS EXPORT
    app.use(cors(corsOptions))
}