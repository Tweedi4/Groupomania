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
  const pseudo = req.body.newpseudo;
  const email = req.body.email;
  const filename = req.file;
  
  console.log(req.body);

  Users.findOne({where: {id: id}})
    .then((monUser) => {
      //console.log(monUser);
      if (pseudo != '') {
        console.log('set pseudo ok ' + pseudo)
        monUser.set({pseudo: pseudo});
      }
      if (email != '') {
        monUser.set({email: email});
      }
      if (filename) {
        const myImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        console.log(myImage);
        monUser.set({image: myImage});
      }
    monUser.save();    
    })
    .catch(error => res.status(400).json({ error }))
/*
  Users.update(
      { pseudo: pseudo },
      { email: email},
      {image: file},
      { where: { id: id } }
  )
      .then(() => res.status(200).json({ message: 'User updated !' }))
      .catch(error => console.error( error ));
//      .catch(error => res.status(400).json({ error }));
*/
};

