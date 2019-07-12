const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var partner = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    role: {
        type: Number,
        default: 3,
        required: true
    },
    status: {
        type: Number,
        default: 1,
        required: true
    },
    tenDV: {
        type: String,
        unique: true,
        default: null
    },
    sdt: {
        type: Number,
        min: 9,
        max: 11,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    diaChi: {
        type: String,
        default: ''
    },
    gioiThieu: {
        type: String,
        default: ''
    },
    anh: {
        type: String,
        default: ''
    }
}, { collection: "congTacVien" });
var model = mongoose.model('congTacVien', partner);
var method = {
    getList: () => {
        return new Promise((resolve, reject) => {
            model.find({}, (err, res) => {
                if (err) return reject(err);
                return resolve(res);
            });
        });
    },
    getPN: () => {
        return new Promise((resolve, reject) => {
            model.findById(id, (err, res) => {
                if (err) return reject(err);
                return resolve(res);
            });
        });
    },
    checkAccount: (tk, done) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.compare(tk.password, tk[0].password, (err, res) => {
                if (res)
                    return done(null, tk[0].username);
                else
                    return done(null, false);
            })
        });
    },
    addPN: (user, pass, email,tenDV) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(pass, salt, (err, hash) => {
                    let data = {
                        username: user,
                        password: hash,
                        email: email,
                        tenDV:tenDV
                    };
                    let pn = new model(data);
                    pn.save((err) => {
                        if (err) return reject(err);
                        return resolve(1);
                    });
                });
            });
        });
    },
    updatePN: (id, data) => {
        return new Promise((resolve, reject) => {
            model.findByIdAndUpdate(id, data, (err) => {
                if (err) return reject(err);
                return resolve(1);
            });
        });
    },
    deletePN: (id) => {
        return new Promise((resolve, reject) => {
            model.findByIdAndDelete(id, (err) => {
                if (err) return reject(err);
                return resolve(1);
            });
        });
    }
}
module.exports = {
    model: model,
    method: method
};