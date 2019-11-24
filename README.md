This is the client side of a MERN project (which uses MongoDb, Express, React and Node.js). 

Server side can be found here: [MERN-Server](https://github.com/einatSh/MERN-Server)

## In order to run both client and server concurrently:
1. Clone both projects into the same folder 
2. In the terminal type: `npm init`, and then type `npm i concurrently, nodemon`
3. In the package.json file, add the following scripts: 
    `"server": cd Server && nodemon server.js,`
    `"client": "npm start --prefix client --ignore client",`
    `"start-all": "concurrently \"npm run server\" \"npm run client\""`
4. Run script from terminal with the commend: `npm run start-all`

* Note: nodemon is only optional, the server can run with node with the script: 
`"server": node server.js` 

## Available Scripts

