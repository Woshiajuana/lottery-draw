'use strict';

import Koa from 'koa'
import logger from 'koa-logger'
import session from 'koa-session'
import bodyParser from 'koa-bodyparser'

import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
const db = 'mongodb://localhost/imooc-app';

mongoose.Promise = require('bluebird');
mongoose.connect(db);

const models_path = path.join(__dirname, '/app/models');
const walk = (modelPath) => {
    fs.readdirSync(modelPath).forEach((file) => {
        let filePath = path.join(modelPath, '/' + file);
        let stat = fs.statSync(filePath);
        if (stat.isFile()) {
            if (/(.*)\.(js|coffee)/.test(file))
                require(filePath);
        } else if (stat.isDirectory()) {
            walk(filePath);
        }
    })
};
walk(models_path);

const app = new Koa();

app.keys = ['imooc'];

app.use(logger());
app.use(session(app));
app.use(bodyParser());
//
const router = require('./config/routes').default;
app.use(router().routes());
app.use(router().allowedMethods());

app.listen(1234);

console.log('Listening:1234');
