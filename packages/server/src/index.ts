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
const version = process.env.npm_package_version ?? "1.0.0";

const host = process.env.HOST ?? 'localhost';
const port = parseInt(`${process.env.PORT}`) || 3000;
const corsOrigin = `http://${host}:${port}`;


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

// const version = '1.0.0';

// Create Listener @ URI
server.listen(port, host, () => {
    logger.info(`SERVER LISTENING @ ${corsOrigin} (v.${version})`);
    socket({ io });
});


// Route: Home
app.get('/', (_, res) => res.send(`SERVER STARTED (v.${version})`));

// #endregion ------------------------------------------------------------------------------------------------