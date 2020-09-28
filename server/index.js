require('dotenv').config();

const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./authController');
const userCtrl = require('./userController');
const checkCtrl = require('./checkController');

const app = express();

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 } //Year long Cookie
}));


//Authorize endpoints
app.post(`/auth/register`, authCtrl.register);
app.post('/auth/login', authCtrl.login);

//User endpoints
app.get(`/api/users`, userCtrl.getAllUsers);

//Check Endpoints
app.post('/api/check', checkCtrl.addCleaningCheck);
app.post('/api/check/:check_date_id', checkCtrl.beginCleaningCheck);


massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
  app.set('db', dbInstance);
  console.log('DB is connected');
  app.listen(SERVER_PORT, () => console.log(`Cleaning on server ${SERVER_PORT}`));
})