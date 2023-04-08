import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import socket from "./socket.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

const httpServer = app.listen(8080, (req, res) => {
  console.log("Listening on port 8080");
});



// const mongoDB = 'mongodb+srv://demparom:aCpa58lQKcs1ucRO>@cluster0.ly4xdtm.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//     console.log('connected')
// }).catch(err => console.log(err))

socket.connect(httpServer);