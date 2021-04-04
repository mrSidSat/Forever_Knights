const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs')
const User = require('../models/user.js')
router.post('/', (req, res) => {

  
    const { UserName, email, password } = req.body
    if (!email || !password || !UserName) {
        return res.status(422).json({ error: "please add all the fields" })
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exists with that email" })
            }
            
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        UserName,
                        email,
                        password: hashedpassword,
                       
                    })
                    console.log(user);
                    user.save()
                        .then(user => {
                            console.log("BOOM!!!!!!!!!!!!!");
                           res.json({ message: "saved successfully" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
        .catch(err => {
            console.log(err)
        })
})
module.exports = router;