'use strict';

const Hapi=require('hapi');
require('dotenv').config() 
const MySQL = require('mysql'); 

const connection = MySQL.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Create a server with a host and port
const server=Hapi.server({
    host:process.env.APP_HOST,
    port:process.env.APP_PORT
});

// Add the route
server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, reply) {
       connection.query('SELECT uid, username, email FROM users',
       function (error, results, fields) {
       if (error) throw error;

       reply(results);
    });
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