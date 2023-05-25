const express = require("express");
const app = express();
const hbs = require("hbs");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//express session middleware
app.use(
    session({
        name: "flash",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
    })
);

;


//connect flash

app.use(flash());

//global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

//flash message

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// views and public directory
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


// route paths
// const dashboardRouter = require("./routes/dashboard/dashboard.router");
const equipmentRouter = require("./routes/equipments/equipments.router");
const pdfRouter = require("./routes/pdf/pdf.router");
const ppmRouter = require("./routes/ppm/ppm.router")
const repairsRouter = require("./routes/repairs/repairs.router")
const usersRouter = require("./routes/users/users.router")

// routes
// app.use("/", dashboardRouter);
app.use("/", equipmentRouter);
app.use("/pdf", pdfRouter);
app.use("/ppm", ppmRouter);
app.use("/repair", repairsRouter);
app.use("/users",usersRouter);
module.exports = app;