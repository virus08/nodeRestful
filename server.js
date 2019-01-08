'use strict';

const Hapi=require('hapi');
require('dotenv').config() 

/*
const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})
*/

// Create a server with a host and port
const server=Hapi.server({
    host:process.env.APP_HOST,
    port:process.env.APP_PORT
});

// Add the route
server.route({
    method:'GET',
    path:'/hello',
    handler:function(request,h) {

        return'hello world';
    }
});

// Start the server
const start =  async function() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();