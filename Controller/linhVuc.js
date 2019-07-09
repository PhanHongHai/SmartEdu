
const modelLV = require('../Model/LinhVuc');
const mongoose = require('mongoose');
module.exports = {
    loadPage: async (req, res) => {
        if (req.isAuthenticated()) {
            let list = await modelLV.model.find();
            res.render('admin', {
                user: req.user, list: list,
                path: 'linhVuc', count: req.session.count, mess: req.session.mess
            });
        }
        else
            res.redirect('/logIn');
    },
    addLV: (req, res) => {
        modelLV.method.addLV(req.body);
        res.redirect('/admin/linh-vuc');
    },
    updateLV: (req, res) => {
        let id = mongoose.Types.ObjectId(req.params.idLV);
        let data = req.body;
        modelLV.method.updateLV(id, data);
        res.redirect('/admin/linh-vuc');

    },
    deleteLV: (req, res) => {
        let id = mongoose.Types.ObjectId(req.params.idLV);
        modelLV.method.deleteLV(id);
        res.redirect('/admin/linh-vuc');
    }
}