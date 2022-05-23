// bcrpyt permet un cryptage sécurisé
const bcrypt = require('bcryptjs');
// jwt permet l'échange sécurisé de jetons (tokens)
const jwt = require('jsonwebtoken');

const { model , Users} = require('../models');



// Création fonctions signup et login
// Créer compte utilisateur
 
exports.signup = (req, res, next) => {
    console.log(req.body);
    const {email, pseudo, password} = req.body

  //Verify parameters
  if (email == null || pseudo == null || password == null) {
      return res.status(400).json({ 'error': 'missing parameters'})
  }

    Users.findOne({
      attributes: ['email'],
      where: { email: email }
  })
      .then(function (userFound) {
          if (!userFound) {
              bcrypt.hash(password, 10, function(err, hash) {
                Users.create({
                    email: email,
                    pseudo: pseudo,
                    password: hash,
                  })
                      .then(function (Users) {
                          return res.status(201).json({
                              'userId': Users.id
                          })
                      })
                      .catch(function (err) {
                          return res.status(500).json({ 'error': 'cant add user' });
                      })
              })
          } else {
              return res.status(409).json({ 'error': 'this user already exist' });
          }
      })
      .catch(function (err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
      })
}


exports.login = (req, res, next) => {
console.log(req.body.email)
//Look for mail address in db
const email = req.body.email
Users.findOne({
  where: { email: email }
})
  .then(user => {
      //If user is not in db
      if (!user) {
          return res.status(401).json({ error: 'This User is not in db !' });
      }
      //If the user is in db
      bcrypt.compare(req.body.password, user.password)
          .then(valid => {
              //If the password isn't correct
              if (!valid) {
                  return res.status(401).json({ error: 'Invalid password !' });
              }
              //If the password is correct, then creation of a token
              res.status(200).json({
                  userId: user.id,
                  email: user.email,
                  token: jwt.sign(
                      { userId: user.id },
                      //création d'un token
                      'RANDOM_TOKEN_SECRET',
                      //valable 24h
                      { expiresIn: '24h' }
                  )
              });
          })
          .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};
