const path = require('path');
const fs = require('fs');

//setup environment
require('dotenv').config();

//Logger
const logger = require('./service/logger');

//setup express
const express = require('express');
const app = express();

//setup morgan
const morgan = require('morgan');
app.use(morgan('combined'));

//setup body parser
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//setup cors
const cors = require('cors');
const corsOptions = {
    // origin: 'http://localhost:4200'
};
app.use(cors(corsOptions));

//setup multer
const multer = require('multer');
const uuidv1 = require('uuid/v1');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.FILES_BASE);
    },
    filename: function (req, file, cb) {
        const filename = file.originalname && file.originalname.substring(0, file.originalname.lastIndexOf('.'));
        const ext = file.originalname && file.originalname.substring(file.originalname.lastIndexOf('.') + 1);
        cb(null, `${filename}-${new Date().getTime()}.${ext}`);
    }
});
const upload = multer({storage: storage});


//setup passport
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const adminHandler = require('./handler/admin');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
};
const strategy = new JwtStrategy(opts, (payload, next) => {
    adminHandler.findByPk(payload.id)
        .then(user => {
            next(null, user)
        })
        .catch(err => {
            throw err;
        });
});
passport.use(strategy);
app.use(passport.initialize());

//Setup controllers
require('./controller')(app, upload);

//setup server
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3700;
server.listen(PORT);
server.on('listening', () => {
    logger.info(`App started on port ${PORT}`)
});
