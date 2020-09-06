const express = require("express");
const session = require("express-session");
const http=require('http');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const server=http.createServer(app);

var io=require('socket.io')(server);

//socket connection
io.on('connection',(socket)=>{
  console.log('connection made')

  socket.on('room',(data)=>{
    socket.emit('socketId',socket.id)
    socket.join(data)
    var x=io.sockets.adapter.rooms[data];
    socket.emit('countViews',x)
    // socket.in(data).emit('countViews', x);
  })

  socket.on('leaveroom',(roomid)=>{
    console.log("hey",roomid)
    socket.leave(roomid)
  })


})

const chalk = require("./config/chalk");
const log = require("./config/logger");

const PORT = process.env.PORT || 5000;

app.use("*", (req, res, next) => {
  const {
    hostname, originalUrl, protocol, method
  } = req;

  console.log(`${method === "GET" ? chalk.getReq(method) : chalk.postReq(method)} ${protocol}://${hostname}:${PORT}${originalUrl}`); // eslint-disable-line
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH");
  next();
});

// DB Config
const db = require("./config/keys").MongoURI;

app.use(cors());

// Connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => log.info("MongoDB connected"))
  .catch((err) => log.error(err));


//Cookie-Parser
app.use(cookieParser());

// Body Parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));


// Routing

app.use("/", require("./src/routes/auth"));
app.use("/dashboard", require("./src/routes/dashboard"));
app.use("/post_story",require("./src/routes/savedStories"))
app.use("/get_stories",require("./src/routes/getStories"))

server.listen(PORT, log.info(`Servers started on ${PORT}`));
