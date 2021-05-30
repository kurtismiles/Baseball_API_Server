
const mysql = require('mysql');
// const { builtinModules } = require('node:module');

const con = mysql.createConnection({
    host: "baseball-database.cn6st4eprl0r.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "lam10987",
    database: "baseball"
});

con.connect(function (err) {
    if (err) throw err;
    else { console.log("Connected!") };
});

module.exports = {
    mysql: mysql,
    con: con
};
