const express = require('express');
const router = express.Router();
const user = require('./user.routes');
const blog = require('./blog.routes')

router.use('/users', user);
router.use('/blogs', blog)


module.exports = router;
