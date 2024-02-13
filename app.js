require('dotenv').config();
require('./DB/__db');
const colors = require('colors');
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoute');
const categoryRoutes = require('./routes/categoryRoute');
const listingRoutes = require("./routes/listingRoute");
const cors = require("cors")

const port = process.env.PORT;

app.use(cors());

// routes
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/listing", listingRoutes);



app.listen(port, () => {
    console.log(`Server start at port no ${port}`.bgMagenta.blue);
})
