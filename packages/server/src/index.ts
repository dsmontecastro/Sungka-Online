import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';

import socket from './modules/socket.js';
import logger from './modules/logger.js';


//#region : Settings & Configuration -------------------------------------------------------------------------

// ENV
config();
const version = process.env.npm_package_version ?? '0.0.1';

const host = process.env.HOST ?? '0.0.0.0';
const port = parseInt(`${process.env.PORT}`) || 8080;
const corsOrigin = `${host}:${port}`;


// ExpressJS App
const app = express();
app.use(cors());

// HTPP & Socket.io
const server = createServer(app);
const io = new Server(server, {
    cors: {
        credentials: true,
        origin: corsOrigin,
    }
});

// #endregion ------------------------------------------------------------------------------------------------


// #region : Settings & Configuration ------------------------------------------------------------------------

// Create Listener @ URI
server.listen(port, host, () => {
    logger.info(`SERVER LAUNCHED (v.${version})`)
    logger.info(`LAUNCHED @ ${corsOrigin}`);
    logger.info(`LISTENING @ ${port}`);
    socket({ io });
});

// Route: Home
app.get('/', (_, res) => {
    let data = `SERVER STARTED (v.${version}) <br/>`;
    data += `\> USERS = ${io.engine.clientsCount} <br/>`;
    data += `\> ROOMS = ${io.of('/').adapter.rooms.size} <br/>`;
    res.send(data);
});

// #endregion ------------------------------------------------------------------------------------------------