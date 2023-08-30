//all the required package and files are imported!
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 4444;
const hbs = require("hbs");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require('./auth/passport');
var flash = require("connect-flash");
const multer  = require('multer')
const isLoggedIn = require('./middlewares/isLoggedIn')
const loginPass = require('./middlewares/logginPass')
require("dotenv").config();


// Creating Image uniquie name in multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    console.log();
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage })




//Registring partials for hbs in partials folder inside of views
hbs.registerPartials(__dirname + "/views/partials");

//All the necessary middleware for supporting application 
app.set("view engine", "hbs");
app.use( upload.single('image'))
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))


//creating sessions for passport login functionality
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017" }),
  })
);

app.use(passport.initialize());
app.use(passport.session());


//Creating Logout function using passport

app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('login');
  });
});


//Creating all path and routes for application
app.get('/' , (req,res)=>{
  if(req.user) return res.redirect('profile')
  return  res.redirect('login')
})
app.use("/login", loginPass, require("./routes/login"));

app.use("/signup", loginPass ,require("./routes/singup"));

app.use('/admin' , isLoggedIn , require('./routes/admin'))

app.use('/shop' , isLoggedIn , require('./routes/shop'))


//Connecting to mongoose and starting the server
mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() =>
    app.listen(PORT, () => {
      console.log(`http://localhost:` + PORT);
    })
  )
  .catch((err) => {
    console.log(err);
  });
