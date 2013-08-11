var db_helper = require('../javascripts/DbManager');

/*
 * GET users listing.
 */
exports.list = function (req, res) {
    db_helper.getUsers(req, res);
};

exports.add = function (request, res) {
    var newUser = new Object();
    newUser.loginName = request.body.user;
    newUser.password = request.body.pass;
    newUser.userName = request.body.name;
    newUser.emailId = request.body.email;
    db_helper.addUser(newUser.loginName, newUser.password, newUser.userName, newUser.emailId, res, function (isSuccess) {
        if (!(isSuccess == null)) {
            res.render('login', {message: "Registration Successful Please Login"});
        } else {
            res.render('signup', {message: "User Addition failed. Register Again...!!"});
        }
    });
    //console.log(res.statusCode);
};

exports.validate = function (req, res) {
    db_helper.validateUser(req.body.user, req.body.pass, res, function (userObject) {
        if (userObject != null) {
            //req.session.loggedIn = true;
            //console.log(userObject);
            console.log('%s logged in', userObject.login_name);
            //req.session.user = user;
            var user = JSON.stringify(userObject);
            res.render('home', {user: user, messages: messages});
            var messages = JSON.stringify(new Array());
            //res.send("Validated User");
        } else {
            console.log("Invalid User");
            res.render('login', {errorMessage: "Invalid User: Login again"});
            //res.send("Invalid User");
        }
    });
};

exports.logout = function (req, res) {
    //req.session.loggedIn = false;
    var username = 'Not logged in';
    res.render('index', {
        title: 'Login Please'
    });
};