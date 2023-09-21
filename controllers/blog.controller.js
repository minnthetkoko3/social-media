const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog.model");

exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(`Blog list has error`);
    return res.status(200).json({
      success: false,
      error: {
        msg: error.message,
      },
    });
  }
};

// exports.addBlogs = async (req, res, next) => {
//   try {
//     const { title, description, image, user } = req.body;

//     const existinguser = User.findById(user)

//     const blog = new Blog({
//       title,
//       description,
//       image,
//       user,
//     });

//     const session = await mongoose.startSession()
//     session.startTransaction()
//     await blog.save({session});
//     existinguser.blog.push(blog)
//     await existinguser.save({session})
//     await existinguser.commitTransaction()

//     return res.status(200).json({ blog });
//   } catch (error) {
//     console.log(`Blog list has error`);
//     return res.status(200).json({
//       success: false,
//       error: {
//         msg: error.message,
//       },
//     });
//   }
// };

exports.addBlogs = async (req, res, next) => {
  try {
    const { title, description, image, user } = req.body;

    // Check if the user exists
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        error: {
          msg: "User not found",
        },
      });
    }

    const blog = new Blog({
      title,
      description,
      image,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });

    await session.commitTransaction();

    return res.status(200).json({ blog });
  } catch (error) {
    console.error(`Blog creation has error: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: {
        msg: "Internal server error",
      },
    });
  }
};


exports.updateBlogs = async (req, res, next) => {
  try {
    const { title, description} = req.body;
    const userId = req.params.id;
    const blog = await Blog.findByIdAndUpdate(userId, {
      title,
      description
    });

    return res.status(200).json({ blog });

  } catch (error) {
    console.log(`Blog list has error`);
    return res.status(200).json({
      success: false,
      error: {
        msg: error.message,
      },
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    return res.status(200).json({ blog });
    
  } catch (error) {
    console.log(`Blog list has error`);
    return res.status(200).json({
      success: false,
      error: {
        msg: error.message,
      },
    });
  }
}

exports.deleteblog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByIdAndRemove(id)
    await blog.user.blogs.pull(blog)
    await blog.user.save()

    return res.status(200).json({ msg: `remove successful`, blog });
  } catch (error) {
    console.log(`unable to delete`);
    return res.status(200).json({
      success: false,
      error: {
        msg: error.message,
      },
    });
  }
}

// exports.deleteblog = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const blog = await Blog.findById(id);

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         error: {
//           msg: "Blog not found",
//         },
//       });
//     }

//     // Ensure the blog has a user associated with it
//     if (!blog.user) {
//       return res.status(400).json({
//         success: false,
//         error: {
//           msg: "Blog is not associated with a user",
//         },
//       });
//     }

//     // Remove the blog from the user's list of blogs
//     const userId = blog.user; // Assuming userId is the reference to the user
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         error: {
//           msg: "User not found",
//         },
//       });
//     }

//     user.blogs.pull(blog);
//     await user.save();

//     // Remove the blog itself
//     await blog.remove();

//     return res.status(200).json({ msg: "Removal successful", blog });
//   } catch (error) {
//     console.error("Unable to delete", error.message);
//     return res.status(500).json({
//       success: false,
//       error: {
//         msg: "Internal server error",
//       },
//     });
//   }
// };


exports.getByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userBlogs = await User.findById(userId).populate('blogs');

    return res.status(200).json({ blogs: userBlogs });
    
  } catch (error) {
    console.log(`Blog list has error`);
    return res.status(200).json({
      success: false,
      error: {
        msg: error.message,
      },
    });
  }
}