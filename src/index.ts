import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';

import handler from './modules/socket.js';
import logger from './modules/logger.js';


//#region : Settings & Configuration -------------------------------------------------------------------------

// ENV
config();
const version = process.env.VERSION ?? '0.0.1';

const host = process.env.HOST ?? '0.0.0.0';
const port = parseInt(`${process.env.PORT}`) || 8080;
const corsOrigin = `${host}:${port}`;


// ExpressJS App
const app = express();
app.use(cors());

// HTTP & Socket.io
const server = createServer(app);
const io = new Server(server, {
    cors: {
        credentials: true,
        origin: corsOrigin,
    }
});

// #endregion ------------------------------------------------------------------------------------------------


// #region : Trackers & Listeners ----------------------------------------------------------------------------

const trackers: Trackers = { users: 0, rooms: 0 };

// Create Listener @ URI
server.listen(port, host, () => {
    logger.info(`SERVER LAUNCHED (v.${version})`)
    logger.info(`LAUNCHED @ ${corsOrigin}`);
    logger.info(`LISTENING @ ${port}`);
    handler({ io, trackers });
});

// Route: Home
app.get('/', (_, res) => {

    const header = `
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title> Sungka Server </title>
        </head>
    `;

    let body = '<body>';
    body += `SERVER STARTED (v.${version}) <br/>`;
    body += `\>  USERS = ${trackers.users} <br/>`;
    body += `\>  ROOMS = ${trackers.rooms} <br/>`;
    body += '</body> </html>';

    res.send(header + body);
});

// #endregion ------------------------------------------------------------------------------------------------