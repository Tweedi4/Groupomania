const { model , Posts} = require('../models');



//create post
exports.createPost = (req, res, next) => {
Posts.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    }).then(submittedPost => res.send(submittedPost))
    };

//get all posts
exports.getAllPosts = (req, res, next) => {
Posts.findAll().then(post => res.send(post));
    };

//get one post by id
exports.getOnePost = (req, res, next) => {
Posts.findAll({
    where: {
        id: req.params.id
    }
    }).then(post => res.send(post))
    };

//update post
exports.updatePost = (req, res, next) => {
Posts.update({
    title: req.body.title,
    content: req.body.content,
},
{
    where:{ id: req.body.id }
}
).then(() => res.send("success"))
    };

//delete post
exports.deletePost = (req, res, next) => {
Posts.destroy({
    where: {
        id: req.params.id
    }
}).then(() => res.send("success"))
    };