const mysql = require('mysql');
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'todolist'
})
con.connect((err)=>{
    if (err) {
        console.log("err");
    } else {
        console.log("mysql conneted...!");
        
    }
})
module.exports = con;