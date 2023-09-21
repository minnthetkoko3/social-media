const app = require('./configs/express.js')
const mongoose = require('./configs/mongoose.js')
const {port} = require('./configs/vars.js')

mongoose.connect();

app.listen(port, () => {
    console.log(`server running at port ${port}`)
})