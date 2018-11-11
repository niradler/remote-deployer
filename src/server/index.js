#!/usr/bin/env node
require("babel-core/register");
require("babel-polyfill");
const express = require('express')
const morgan = require('morgan')
const sh = require('shelljs')
const fs = require('fs');
const path = require('path');
const store = require('../helpers/store');
const app = express();

const run = async () => {
    const config = await store.getHTTPConfig();
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
    app.use(morgan('combined',{stream: accessLogStream}));
    app.use('/',async (req,res,next) => {
        try {
            if (config.app_key === req.query.appKey) {
                return next();
            }
            throw new Error('missing or incorrect app key!');
        } catch (error) {
            return res.status(401).send('missing or incorrect app key!');
        }
    })
    // API Routes
    app.get('/', async (req,res)=> {
        try {
            const script_path =await store.getDeployScriptPath();
            //windows, linux
            sh.exec("C:\\Users\\admin\\Documents\\deploy.sh", (code, output) => {
                sh.echo(`Deployment script exit code ${code}`);
              })
            return res.json({msg:'deployment script running!',script:script_path})
        } catch (error) {
            console.error(error)
            return res.json({msg:'deployment failed!'})
        }

    });
    
    // initialize the server
    const PORT = config.port || 5454;
    app.listen(PORT, () => console.log('App listening on port '+ PORT))
}

run();