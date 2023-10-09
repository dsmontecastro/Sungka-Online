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
const version = process.env.npm_package_version ?? '1.0.0';

const host = process.env.HOST ?? '0.0.0.0';
const port = parseInt(`${process.env.PORT}`);
const corsOrigin = `${host}:${port}`;
console.log(corsOrigin);


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
    logger.info(server.address());
    logger.info(`SERVER LISTENING @ ${corsOrigin} (v.${version})`);
    socket({ io });
});


// Route: Home
app.get('/', (_, res) => res.send(`SERVER STARTED (v.${version})`));

// #endregion ------------------------------------------------------------------------------------------------