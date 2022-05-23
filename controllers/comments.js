const { model , Comments} = require('../models');

//get all comments
exports.getAllComments = (req, res, next) => {
Comments.findAll().then(comments => res.send(comments));
    };
exports.getOneComment = (req, res, next) => {
Comments.findOne({
    where: {id: req.params.id}
}).then(comment => res.send(comment))
    };
exports.createComment = (req, res, next) => {
Comments.create({
    message: req.body.message,
    userId: req.body.userId,
    postId: req.body.postId,
}).then(submittedComment => res.send(submittedComment))
    };
exports.updateComment = (req, res, next) => {
Comments.update({
    message: req.body.message,
},
{
    where:{ id: req.body.id}
}
).then(() => res.send("success"))
    };
exports.deleteComment = (req, res, next) => {
Comments.destroy({
    where: {
        id: req.params.id
    }
}).then(() => res.send("success"))
    };