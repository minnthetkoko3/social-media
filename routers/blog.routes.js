const express = require("express");
const controller = require("../controllers/blog.controller");
const blog = express.Router();

blog.get("/", controller.getAllBlogs);
blog.post('/add-blog', controller.addBlogs)
blog.put('/update/:id', controller.updateBlogs)
blog.get('/:id', controller.getById)
blog.delete('/:id', controller.deleteblog)
blog.get('/user/:id', controller.getByUserId)


module.exports = blog;
