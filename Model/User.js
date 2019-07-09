const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

var user = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 1
    },
    hoTen: String
}, { collection: 'nguoiDung' });
var model = mongoose.model('nguoiDung', user);
var method = {
    getList: () => {
        return new Promise((resolve, reject) => {
            model.find({}, (err, res) => {
                if (err) return reject(err);
                return resolve(res);
            })
        })
    },
    getUser: (id) => {
        return new Promise((resolve, reject) => {
            model.findById(id, (err, res) => {
                if (err) return reject(err);
                return resolve(res);
            })
        })
    },
    addUser: (user, pass, role) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(pass, salt, (err, hash) => {
                    let data = {
                        username: user,
                        password: hash,
                        role: role
                    };
                    let us = new model(data);
                    us.save((err) => {
                        if (err) return reject(err);
                        return resolve(1);
                    });
                });
            });
        });
    },
    updateUser: (id, data) => {
        return new Promise((resolve, reject) => {
            model.findByIdAndUpdate(id, data, (err) => {
                if (err) return reject(err);
                return resolve(1);
            });
        })
    },
    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            model.findByIdAndDelete(id, (err) => {
                if (err) return reject(err);
                return resolve(1);
            });
        });
    },
    logIn: (acc) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.compare(acc.pass, acc[0].password, (err, res) => {
                    if (err)
                        return reject(err);
                    else
                        return resolve(1);
                })
            });
        });
    },
    checkAccount: (tk, done) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.compare(tk.password, tk[0].password, (err, res) => {
                if (res)
                    return done(null, tk[0]);
                else
                    return done(null, false);
            })
        });
    },
};
module.exports = {
    model: model,
    method: method
};
