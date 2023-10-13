# Sungka Online
Try it out: [https://dsmontecastro.github.io/Sungka-Online/](https://dsmontecastro.github.io/Sungka-Online/)

A full-stack, monorepo project made primarily with __React, Typescript, & Socket.io__.
* The front-end (client) is built on __Vite, Tailwind CSS, and React-Redux__.
* The back-end (server) uses __HTTP & ExpressJS__, hosted on _Adaptable.io_.


![Screenshot](https://dsmontecastro.github.io/Portfolio/sungka.png)



### Local Setup
* Install [Node & NPM](https://nodejs.org/en/download), if needed.
* Clone the repository.
  ```sh
  git clone https://github.com/dsmontecastro/Sungka-Online.git
  ```

* Run these commands in the root directory.
  ```sh
  npm install
  npm run build
  ```

* Make new `.env` files for both client and server:
    * Server
        ```sh
        HOST = 'localhost'    # or '127.0.0.1'
        PORT = 4000           # or any usable port
        ```
    * Client
        ```sh
        VITE_TITLE = 'Sungka Online'
        HOST = 'localhost'    # must match Server.HOST above
        PORT = 4000           # must match Server.PORT above
        ```

* On two separate terminals, run these commands in order:
        ```sh
        npm run start -w ./packages/server
        ```
        ```sh
        npm run start -w ./packages/client
        ```

* After use, clean up the files if necessary.
    ```sh
    npm run clean # deletes internal build & node_modules folders
    npm run reset # deletes the root node_modules folder
    ```