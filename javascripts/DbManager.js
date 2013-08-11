/**
 * Created with IntelliJ IDEA.
 * User: vicky
 * Date: 04/08/13
 * Time: 1:49 PM
 */

var mysql = require('mysql')
    , uuidGenerator = require('./Math.uuid')
    , MYSQL_USERNAME = 'root'
    , MYSQL_PASSWORD = 'password123'
    , DATA_BASE = 'messaging_website';

var client = mysql.createConnection({
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: DATA_BASE
});

//client.query('use grabhalo');
//console.log("It works!!");

exports.getUsers = function (callback) {
    client.query("select user_id, login_name, user_name from user_login", function (err, details) {
        if (!err) {
            //console.log(details);
            if (!(details == null)) {
                callback(details);
            } else {
                callback(null);
            }
        }
        else {
            console.log("ERROR in getUsers");
            callback(null);
            //res.send(err.message);
        }
    });
}

exports.addUser = function (loginName, password, userName, emailId, res, callback) {
    var userId = Math.uuid(24);
    //console.log(userId);
    client.query("insert into user_login values(?,?,?,?,?)", [userId, loginName, password, userName, emailId], function (err, details) {
        if (!err) {
            //console.log(details);
            if (!(details == null)) {
                callback("success");
            } else {
                callback(null);
            }
        }
        else {
            console.log("ERROR in addUser");
            callback(null);
            //res.send(err.message);
        }
    });
}

exports.addMessage = function (userId, message, receiverList, threadId, request, res) {
    var messageId = Math.uuid(24);
    if (threadId == null) {
        var threadId = Math.uuid(24);
    }
    //console.log(receiverList);
    if ((receiverList[0].length != 24)) {
        var receiverList = new Array(receiverList);
        //console.log(receiverList);
    }
    var timestampNow = new Date();
    //console.log(timestampNow);
    client.query("insert into message values(?,?,?,?,?)", [messageId, userId, threadId, message, timestampNow], function (err, details) {
        if (!err) {
            if (!(details == null)) {
                for (var index in receiverList) {
                    var uuid = Math.uuid(24);
                    //console.log(receiverList[index]);
                    client.query("insert into message_receiver values(?,?,?)", [uuid, receiverList[index], threadId], function (err, detail) {
                        if (!(detail == null)) {
                            //callback("success");
                            res.render('home', {user: request.body.user, message: "Message added successfully"});
                        } else {
                            //callback(null);
                            //rollback
                            res.render('home', {user: request.body.user, message: "Message addition failed"});
                        }
                    });
                }
            } else {
                res.render('home', {user: request.body.user, message: "Message addition failed"});
            }
        }
        else {
            console.log("ERROR in addMessage");
            res.render('home', {user: request.body.user, message: err.message});
        }
    });
}

exports.validateUser = function (loginName, password, res, callback) {
    client.query("select user_id, login_name, user_name from user_login where login_name = ? and password = ?", [loginName, password], function (err, details) {
        if (!err) {
            //console.log(details);
            if (!(details[0] == null)) {
                callback(details[0]);
            } else {
                callback(null);
            }
        }
        else {
            console.log("ERROR in validateUser");
            callback(null);
            //res.send(err.message);
        }
    });
}

exports.getMessages = function (threadIdArray, req, res, callback) {
    var threadIdString = threadIdArray.toString();
    //console.log(threadIdString);
    client.query("select * from message where thread_id in(" + threadIdString + ") group by thread_id", function (err, details) {
        if (!err) {
            //console.log(details);
            if (!(details[0] == null)) {
                callback(details)
            } else {
                callback(null)
                //return null;
            }
        }
        else {
            console.log("ERROR in getMessages" + err);
            callback(null);
            //res.send(err.message);
        }
    });
}

exports.getThreadMessages = function (threadId, callback) {
    //console.log(threadId);
    client.query("select * from message where thread_id =? order by date_created", [threadId], function (err, details) {
        if (!err) {
            //console.log(details);
            if (!(details[0] == null)) {
                callback(details)
            } else {
                callback(null)
                //return null;
            }
        }
        else {
            console.log("ERROR in getMessages" + err);
            callback(null);
            //res.send(err.message);
        }
    });
}

exports.getThreadIds = function (req, res, userId, callback) {
    client.query("select distinct thread_id from message_receiver where receiver_id = " + userId, function (err, details) {
        if (!err) {
            //console.log(details);
            if (!(details[0] == null)) {
                callback(details);
            } else {
                callback(null);
            }
        }
        else {
            console.log("ERROR in getThreadIds");
            callback(null);
            //res.send(err.message);
        }
    });
}

