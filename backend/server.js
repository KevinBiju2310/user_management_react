const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/usm")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("Error connecting MongoDB: ", err));

const express = require("express");
const cors = require("cors");
const path = require("path")
const userRoute = require("./Routes/userRoute");


const app = express();
app.use(cors());

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/user",userRoute);


app.listen(5000,()=>{console.log("Server running successfully")})