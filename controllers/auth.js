// bcrpyt permet un cryptage sécurisé
const bcrypt = require('bcryptjs');
// jwt permet l'échange sécurisé de jetons (tokens)
const jwt = require('jsonwebtoken');

const models = require('../models');


// Création fonctions signup et login
// Créer compte utilisateur
exports.signup = (req, res, next) => {

  const email = req.body.email;
  const pseudo = req.body.pseudo;
  const password = req.body.password;

  //Verify parameters
  if (email == null || pseudo == null || password == null) {
      return res.status(400).json({ 'error': 'missing parameters' })
  }

  models.users.findOne({
      attributes: ['email'],
      where: { email: email }
  })
      .then(function (userFound) {
          if (!userFound) {
              bcrypt.hash(password, 10, function (err, hash) {
                  const newUser = models.users.create({
                      email: email,
                      pseudo: pseudo,
                      password: hash,
                  })
                      .then(function (newUser) {
                          return res.status(201).json({
                              'userId': newUser.id
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
console.log(req.body.password)
//Look for mail address in db
const email = req.body.email
models.users.findOne({
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
/*
// Création fonctions signup et login
// Créer compte utilisateur
exports.signup = async (req, res, next) => {
    const regexPasswordHard = new RegExp('^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$');
  console.log(req.body);
    if (regexPasswordHard.test(req.body.password)){
        
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new user({
                email: req.body.email,
                pseudo: req.body.pseudo,
                password: hash,
            });
            user.create()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch( error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    }
    else {
        res.status(400).json({ message : 'Mot de passe invalide, veuillez mettre au minimum 8 caractères, dont 1 majuscule et un nombre :' + req.body})
    }
  };
// Connexion à un compte utilisateur
exports.login = (req, res, next) => {
    user.findOne({email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                  { userId: user._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
                )
              });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };

*/