import express from "express";
import cors from "cors";
import {readdirSync} from "fs";
import mongoose from "mongoose";

require("dotenv").config();

const app = express();

mongoose.connect(process.env.DATABASE)
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log("DB CONNECTION ERR => ", err));


const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: false }));


readdirSync("./routes").map((singleRoute) => {
    app.use("/api", require(`./routes/${singleRoute}`))
});

app.listen(8000, () => {
    console.log("Server started on port 8000");
})
