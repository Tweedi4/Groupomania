// bcrpyt permet un cryptage sécurisé
const bcrypt = require('bcryptjs');

const { model , Users} = require('../models');
// jwt permet l'échange sécurisé de jetons (tokens)

exports.getUserFromToken = (req, res, next) => {
//  const jwt = require('jsonwebtoken');
//  const token = req.params.tokenNum;
//  const decodedToken = jwt.verify(token,'RANDOM_TOKEN_SECRET');
//  const userIdFromToken = decodedToken.userId;
//  console.log(userIdFromToken);
//  return userIdFromToken;
  };


exports.getUserProfile = (req, res, next) => {
  Users.findOne({ where: {id: req.params.id},
  attributes: ['pseudo','email','image','createdAt','updatedAt']})
  .then(users => res.status(200).json(users))
  .catch(error => res.status(400).json({ error }));
  };

exports.deleteUser = (req, res, next) => {
  let id = req.body.id
  Users.destroy({ where: { userId: id } })
      .then(() => Users.destroy({ where: { id: id } }))
          .then(() => res.status(200).json({ message: 'User deleted !' }))
          .catch(error => res.status(400).json({ error }))
      .catch(error => res.status(500).json({ error }));
  };

exports.updateUser = (req, res, next) => {
  const id = req.body.id;
  const pseudo = req.body.pseudo;
  Users.update(
      { pseudo: pseudo },
      { where: { id: id } }
  )
      .then(() => res.status(200).json({ message: 'User updated !' }))
      .catch(error => res.status(400).json({ error }));
  };

