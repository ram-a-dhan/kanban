const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { comparePassword } = require('../helpers/bcrypt')
const customError = require('http-errors')
const secret = process.env.JWT_SECRET

class UserController {
    static googleSignIn = (req, res, next) => {
        let email = null;
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            email = ticket.getPayload().email;
            let loginData = {
                email: email
            }
            return User.findOne({ where: loginData })
        })
        .then(data => {
            if (data) {
                console.log(data);
                return data;
            } else {
                let newUser = {
                    email: email,
                    password: email
                };
                return User.create(newUser)
            }
        })
        .then(data => {
            let token = jwt.sign({ id: data.id }, secret);
            res.status(200).json({ token });
        })
        .catch(err => {
            next(err);
        })
    }

    static register = async (req, res, next) => {
        try {
            let newUser = {
                email: req.body.email,
                password: req.body.password
            }
            let registerNewUser = await User.create(newUser)
            res.status(201).json(registerNewUser)
        } catch (err) {
            next(err)
        }
    }

    static login = async (req, res, next) => {
        try {
            let loginEmail = { email: req.body.email }
            let loginPassword = req.body.password
            
            let user = await User.findOne({ where: loginEmail })
            if (!user) throw new customError(400)
            
            let passTest = await comparePassword(loginPassword, user.password)
            if (!passTest) throw new customError(400)
            
            let token = await jwt.sign({ id: user.id }, secret)
            if (!token) throw new customError(500)

            res.status(200).json({ token })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController