const express = require('express');
const port = 8005;
const app = express();
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect(("mongodb+srv://aksharkoctal8:okFhHM5cX88fOeao@akshar.fxsbbxv.mongodb.net/todo_list?retryWrites=true&w=majority&appName=AKSHAR"), {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log(err));
const session = require('express-session');
const flash = require('connect-flash');
const customFlash = require('./config/CustmFlash');
app.use(flash());


const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');


app.use(express.urlencoded());

app.use(session({
    name : "Akshar",
    secret:"ak",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*100
    }
}))


app.use(customFlash.Setflash);

app.use("/todo", require("./router/todorouter"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server running on port", port);
  }
});
