// bcrpyt permet un cryptage sécurisé
const bcrypt = require('bcryptjs');
// jwt permet l'échange sécurisé de jetons (tokens)
//const jwt = require('jsonwebtoken');

const { model , Users} = require('../models');


exports.getUserProfile = (req, res, next) => {
  Users.findAll()
  .then(users => res.status(200).json(users))
  .catch(error => res.status(400).json({ error }));
  };

exports.deleteUser = (req, res, next) => {
  let id = req.body.id
  Users.destroy({ where: { userId: id } })
      .then(() => models.Users.destroy({ where: { id: id } }))
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

