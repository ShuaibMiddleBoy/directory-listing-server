const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('DB Connected!!'.bgGreen);
}).catch((err) => {
    console.log("DB Connection Failed!!".bgRed);
})


module.exports = mongoose;