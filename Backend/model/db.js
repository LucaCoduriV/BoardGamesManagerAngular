// get the client
const mysql = require('mysql2');

/**
 * Permet de créer un pool de connection pour le serveur mysql
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

exports.pool = pool;
