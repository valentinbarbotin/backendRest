const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const app = express();
const helmet = require('helmet');
const cors = require('cors');

const API = require('./routes/API');

app.use(cors());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cookieParser());
app.use(session(
  {
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: false,
    secret: 'XCR3rsasa%RDHHH',
    cookie: { maxAge: 3600000*2 },
    name: "API"
  }
));

const PORT = process.env.PORT_WEB || 8090;

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
  
} = process.env

console.log(MONGO_USERNAME)

url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority`;

console.log(url)

const options = {
  useNewUrlParser: true,
  // reconnectTries: Number.MAX_VALUE,
  // reconnectInterval: 500,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true,
  // retrywrites: false
};

mongoose.connect(url, options)
.then ( function () {
  console.log('DB OK');
})
.catch ( function (err) {
  console.log("DB Erreur : "+err);
});

app.use('/API', API);

app.listen(PORT, function () {
  console.log(`API listen on : ${PORT}!`);
})
