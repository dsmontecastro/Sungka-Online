import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
// import { Server } from 'socket.io';
import { createServer } from 'http';

// import socket from './modules/socket.js';
import logger from './modules/logger.js';


//#region : Settings & Configuration -------------------------------------------------------------------------

// ENV
config();
const version = process.env.npm_package_version ?? '1.0.0';
const env = process.env.NODE_ENV;

const host = process.env.HOST ?? '127.0.0.1';
const port = parseInt(`${process.env.PORT}`) || 3000;
// const corsOrigin = `http://${host}:${port}`;


// ExpressJS App
const app = express();
app.use(cors());

// HTPP & Socket.io
const server = createServer(app);
// const io = new Server(server, {
//     cors: {
//         credentials: true,
//         origin: corsOrigin,
//     }
// });

// #endregion ------------------------------------------------------------------------------------------------


// #region : Settings & Configuration ------------------------------------------------------------------------

// Create Listener @ URI

if (env != 'production') {
    server.listen(port, host, () => {
        // logger.info(`SERVER LISTENING @ ${corsOrigin} (v.${version})`);
        // socket({ io });
    });
}

else {
    server.listen(port, () => {
        const address = server.address();
        logger.info(`SERVER LISTENING @ ${address} (v.${version})`);
        // socket({ io });
    });
};


// Route: Home
app.get('/', (_, res) => res.send(`SERVER STARTED (v.${version})`));

// #endregion ------------------------------------------------------------------------------------------------