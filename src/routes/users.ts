var express = require('express');
var router = express.Router();
const db = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 13;
const Users = db.Users;
/* GET users listing. */
router.post('/register', async function (req, res, next) {
  if (req.body){
    if (req.body.password) {
      bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          try {
            const data = await Users.create(
              {
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                phone: req.body.phone,
                accountType: 'standered',
                password: hash
              }
            );
            return res.send(data);
          } catch (error) {
            return res.json(error)
          }
          
        }
      });
    }else{
      return res.json({ message: 'passowrd missing' });
    }
  }else{
    return res.json({ message: 'input missing' });
  }
  
});

router.post('/login', async (req, res, next) => {
  if (req.body) {
    if(req.body.email){
      let currentUser = await Users.findAll({
        where:{ email: req.body.email }
      })
      if(currentUser.length>0){
        if(req.body.password){
          bcrypt.compare(req.body.password, currentUser[0].password, (comperr) => {
            if (comperr) {
              return res.json({ comperr, message: 'mismatch err' })
            }
            else {
              const jwtToken = jwt.sign(
                {
                  fname: currentUser[0].fname, lname: currentUser[0].lname, email: currentUser[0].email
                },
                'superSecret@wwe',
                {
                  expiresIn: "7d"
                }
              );
              return res.json({ message: 'success', token:jwtToken }).status(200);
            }
          })
        }
        else{
          return res.json({ message: 'password missing' });
        }
      }
    }
    else{
      return res.json({ message: 'email missing' });
    }
  }
  else {
    return res.json({ message: 'input missing' });
  }
});
module.exports = router;