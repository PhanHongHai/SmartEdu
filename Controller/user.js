const modelUser = require('../Model/User');


module.exports = {
    //user
    getAccount: async (username, password, done) => {

        let tk = await modelUser.model.find({username:username});
        if (tk.length != 0) {
            tk = { ...tk, password: password };
            modelUser.method.checkAccount(tk, done);

        }
        else
            return done(null, false, { message: 'Tai khoan khong ton tai.' });
    },
    getListAccount: async (req, res) => {
        if (req.isAuthenticated()) {
            if (req.session.mess == null)
                req.session.mess = 2;
            let tk = await acc.find();
            res.render('admin', { user: req.user, acc: tk, path: "Account", count: req.session.count, mess: req.session.mess });
        }
        else
            res.redirect('/login');
    },
    checkAccount: async (name, done) => {
        let tk = await modelUser.model.find({ username: name });
        if (tk)
            return done(null, tk[0]);
        else
            return done(null, false, { message: 'Tai khoan khong ton tai.' });
    },
    addAccount: async (req, res) => {
        let {username} = req.body;
        let {password} = req.body;
        let {role} = req.body;
        let kt = await modelUser.method.addUser(username, password, role);
        if (req.session.mess == null)
            req.session.mess = 2;
        if (kt) {
            req.session.mess = 1;
        }
        req.session.mess = 0;
    },
    updateAccount: async (req, res) => {
        let kt = await method.updateAccount(req.params.idAcc, req.body.username, req.body.password, req.body.role);
        if (req.session.mess == null)
            req.session.mess = 2;
        if (kt) {
            req.session.mess = 1;
            res.status(200).json({ mess: 'success' })
        } else {
            req.session.mess = 0;
            res.status(500).json({ mess: 'fail' })
        }

    },
    deleteAccount: async (req, res) => {
        let kt = await method.deleteAccount(req.params.idAcc);
        if (req.session.mess == null)
            req.session.mess = 2;
        if (kt) {
            req.session.mess = 1;
            res.status(200).json({ mess: 'success' })
        } else {
            req.session.mess = 0;
            res.status(500).json({ mess: 'fail' })
        }
    }

}