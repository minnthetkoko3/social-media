require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    mongo: process.env.MONGO_URI,
}