const { model , Posts, Users} = require('../models');

const jwt = require('jsonwebtoken');


//create post
exports.createPost = (req, res, next) => {
    console.log(req);
Posts.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }).then(submittedPost => res.send(submittedPost))
    };

//get all posts
exports.getAllPosts = (req, res, next) => {
Posts.findAll().then(post => res.send(post));
    };

//get one post by id
exports.getOnePost = (req, res, next) => {
Posts.findOne({
    where: {id: req.params.id},
    include: {
        model: Users,
        attributes: ['pseudo','email','image','createdAt','updatedAt']
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
Posts.destroy({where: {id: req.params.id}})
    .then(() => res.status(200).json({ message: 'Post deleted !' }))
    .catch(error => res.status(400).json({ error }));
    };