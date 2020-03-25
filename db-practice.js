const mysql = require('mysql');
const inquirer = require('inquirer');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 9000;

const connection = mysql.createConnection({
    host: 'localhost',
    port: `${PORT}`,
    user: 'root',
    password: 'Apt0718!',
    database: 'playlistdb'
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});
