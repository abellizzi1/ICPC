"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
const mysql = require('mysql2');
const { Client } = require('ssh2');
const sshClient = new Client();
require('dotenv/config');
app.get('/details', (req, res) => {
    //start connection
    const dbServer = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DBNAME
    };
    const tunnelConfig = {
        host: process.env.DB_HOST,
        port: process.env.SSH_PORT,
        username: process.env.SSH_USER,
        password: process.env.SSH_PASS
    };
    const forwardConfig = {
        srcHost: process.env.SRC_HOST,
        srcPort: process.env.DB_PORT,
        dstHost: process.env.DB_HOST,
        dstPort: process.env.DB_PORT
    };
    const SSHConnection = new Promise((resolve, reject) => {
        sshClient.on('ready', () => {
            sshClient.forwardOut(forwardConfig.srcHost, forwardConfig.srcPort, forwardConfig.dstHost, forwardConfig.dstPort, (err, stream) => {
                if (err)
                    reject(err);
                const updatedDbServer = Object.assign(Object.assign({}, dbServer), { stream });
                const connection = mysql.createConnection(updatedDbServer);
                connection.connect((error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(connection);
                });
            });
        }).connect(tunnelConfig);
    });
    //connected, query below
    SSHConnection.then(function (connection) {
        connection.query("SELECT * FROM test", function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            res.send(results);
        });
    });
});
app.post('/post/:num', (req, res) => {
    //start connection
    const dbServer = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DBNAME
    };
    const tunnelConfig = {
        host: process.env.DB_HOST,
        port: process.env.SSH_PORT,
        username: process.env.SSH_USER,
        password: process.env.SSH_PASS
    };
    const forwardConfig = {
        srcHost: process.env.SRC_HOST,
        srcPort: process.env.DB_PORT,
        dstHost: process.env.DB_HOST,
        dstPort: process.env.DB_PORT
    };
    const SSHConnection = new Promise((resolve, reject) => {
        sshClient.on('ready', () => {
            sshClient.forwardOut(forwardConfig.srcHost, forwardConfig.srcPort, forwardConfig.dstHost, forwardConfig.dstPort, (err, stream) => {
                if (err)
                    reject(err);
                const updatedDbServer = Object.assign(Object.assign({}, dbServer), { stream });
                const connection = mysql.createConnection(updatedDbServer);
                connection.connect((error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(connection);
                });
            });
        }).connect(tunnelConfig);
    });
    //connected, query below
    SSHConnection.then(function (connection) {
        connection.query("insert into test(testint) values (?);", [req.params.num], function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            res.send(results);
        });
    });
});
app.listen(3000, () => {
    console.log('The application is listening on port 3000');
});
