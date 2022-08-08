// bcrpyt permet un cryptage sécurisé
const bcrypt = require('bcryptjs');

const { model , Users} = require('../models');
// jwt permet l'échange sécurisé de jetons (tokens)


exports.getUserProfile = (req, res, next) => {
  Users.findOne({ where: {id: req.params.id},
  attributes: ['pseudo','email','image','createdAt','updatedAt','is_admin']})
  .then(users => res.status(200).json(users))
  .catch(error => res.status(400).json({ error }));
  };

exports.deleteUser = (req, res, next) => {
  Users.destroy({ where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: 'User deleted !' }))
      .catch(error => res.status(400).json({ error }));
  };

exports.updateUser = (req, res, next) => {
  const id = req.body.userId;
  //const pseudo = req.body.pseudo;
  //const email = req.body.email
  const file = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  console.log(file);

  /*const monUser = Users.findOne({where: {id: id}});
  if (pseudo != '') {
    monUser.set({pseudo: pseudo});
  }
  if (file != '') {
    monUser.set({image: file});
  }
monUser.save();*/

  Users.update(
      //{ pseudo: pseudo },
      //{ email: email},
      {image: file},
      { where: { id: id } }
  )
      .then(() => res.status(200).json({ message: 'User updated !' }))
      .catch(error => console.error( error ));
//      .catch(error => res.status(400).json({ error }));
  };

