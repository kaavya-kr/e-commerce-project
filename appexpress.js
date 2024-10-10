// const http = require('http'); comment because save code for last section 
const path = require('path');
const fs = require('fs');
const https=require('https');
const express = require('express'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash=require('connect-flash');
const multer = require('multer');
const helmet=require('helmet');
const compression =require('compression');
const morgan = require('morgan');

const errorController = require('./controllers/error'); 

const User = require('./models/user');

console.log(process.env.NODE_ENV);
const MONGODB_URI=
   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ysddy.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
const app = express();
const store = new MongoDBStore({
   uri: MONGODB_URI,
   collection: 'sessions'
});

const csrfProtection = csrf();

const privateKey = fs.readFileSync('server.key');
const certificate = fs.readFileSync('server.cert');

const fileStorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'images');
   },
   filename: (req, file, cb) => {
      cb(null, new Date().toISOString().replace(/:/g,'-') + '-' + file.originalname);
   }
})

const fileFilter=(req, file, cb) => {
   if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' || 
      file.mimetype === 'image/jpeg'
   ) {
      cb(null, true);
   } else {
      cb(null, false);
   }


};

app.set('view engine', 'ejs'); //global configuration value  when we have values globally on express  it can be keys or configuration item express doesnt understand but we could read from the app object with this app
//view engine allow to tell for any dynamic templates they are trying to render and there will be special function   views allow to tell where to find these dynamic views
app.set('views', 'views');
 //  this defines that it should be in a folder named routes and in that folder a file named admin.js
const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');
 const authRoutes = require('./routes/auth');

 const accessLogStream = fs.createWriteStream(
   path.join(__dirname,'access.log'),
   {flags:'a'}
);

app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessLogStream}));

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))

app.use(express.static(path.join(__dirname, 'public'))); // it will take any req that tries to find some file(i]file automatically forward to the public folder) 
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use(
   session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store 
   })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
   res.locals.isAuthenticated = req.session.isLoggedIn;
   res.locals.csrfToken = req.csrfToken();
   next();
 });

app.use((req, res, next) => {
   // throw new Error('Sync Dummy');
if (!req.session.user) {
   return next();
}
   User.findById(req.session.user._id)
   .then(user => {
      // throw new Error('Dummy');
      if (!user) {
         return next();
      }
     req.user = user;
     next();
   })
   .catch(err => {
      next(new Error(err));
}
);
});



 app.use('/admin', adminRoutes);        
 //this are outsourced routes
 //for section 6  here we use adminRoutes because we changed adminData to adminRoutes for section7
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500',errorController.get500);
 app.use(errorController.get404);

 app.use((error,req,res,next) => {
   
   // res.redirect('/500');
   res.status(500).render('500', {
      pageTitle: 'Error!',
      path: '/500',
      isAuthenticated: req.session.isLoggedIn
    });
 });

mongoose
.connect(MONGODB_URI)
.then(result => {
   // https.createServer({key: privateKey,cert: certificate},app)
   // .listen(process.env.PORT || 3000);
   app.listen(process.env.PORT || 3000);

   })
  .catch(err => {
   console.log(err);
  });