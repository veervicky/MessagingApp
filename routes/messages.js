/**
 * Created with IntelliJ IDEA.
 * User: vicky
 * Date: 07/08/13
 * Time: 12:38 AM
 * To change this template use File | Settings | File Templates.
 */
var dbManager = require('../javascripts/DbManager');
var messages = require('../routes/messages');

exports.add = function (request, res) {
    var newMessage = new Object();
    newMessage.userId = JSON.parse(request.body.user).user_id;
    newMessage.userName = JSON.parse(request.body.user).user_name;
    newMessage.message = request.body.message;
    newMessage.receiverList = request.body.receiverList;
    newMessage.threadId = request.body.threadId;
    dbManager.addMessage(newMessage.userId, newMessage.message, newMessage.receiverList, newMessage.threadId, newMessage.userName, request, res);
};

exports.showReceived = function (req, res) {
    var userObject = JSON.parse(req.body.user);
    var userId = JSON.stringify(userObject.user_id);
    //console.log(userId);
    dbManager.getThreadIds(req, res, userId, function (threadIds) {
        //console.log(threadIds);
        if (threadIds) {
            var threadIdsArray = new Array();
            for (threadIdIndex in threadIds) {
                threadIdsArray.push("'" + threadIds[threadIdIndex].thread_id + "'");
            }
            //console.log(threadIds);
            dbManager.getMessages(threadIdsArray, req, res, function (messages) {
                res.render("threadMessages", {user: req.body.user, messages: JSON.stringify(messages)});
            });
        } else {
            res.render("home", {user: req.body.user, message: "You have no messages"});

        }

    });
};

exports.showMessagesReceived = function (req, res) {
    var userObject = JSON.parse(req.body.user);
    var userId = JSON.stringify(userObject.user_id);
    //console.log(userId);
    dbManager.getMessageIds(req, res, userId, function (messageIds) {
        //console.log(messageIds);
        if (messageIds) {
            var messageIdArray = new Array();
            for (messageIdIndex in messageIds) {
                messageIdArray.push("'" + messageIds[messageIdIndex].message_id + "'");
            }
            //console.log(threadIds);
            dbManager.getMessagesUsingMessageIds(messageIdArray, req, res, function (messages) {
                res.render("threadMessages", {user: req.body.user, messages: JSON.stringify(messages)});
            });
        } else {
            res.render("home", {user: req.body.user, message: "You have no messages"});

        }

    });
};

exports.showThread = function (req, res) {
    dbManager.getThreadMessages(req.body.threadId, function (messages) {
        //console.log(messages);
        if (!(messages == null)) {
            res.render("receivedMessages", {user: req.body.user, messages: JSON.stringify(messages), threadId: req.body.threadId});
            //res.render(messages);
        } else {
            res.send("Message Reception failed");
        }
    });
};

exports.showRestrictedThread = function (req, res) {
    var userObject = JSON.parse(req.body.user);
    var userId = JSON.stringify(userObject.user_id);
    dbManager.getMessageIds(req, res, userId, function (messageIds) {
        //console.log(messageIds);
        if (messageIds) {
            var messageIdsArray = new Array();
            for (messageIdIndex in messageIds) {
                messageIdsArray.push("'" + messageIds[messageIdIndex].message_id + "'");
            }
            dbManager.getRestrictedThreadMessages(messageIdsArray, req.body.threadId, function (messages) {
                if (!(messages == null)) {
                    res.render("receivedMessages", {user: req.body.user, messages: JSON.stringify(messages), threadId: req.body.threadId});
                    //res.render(messages);
                } else {
                    res.send("Message Reception failed");
                }
            });
        } else {
            res.send("Message Reception failed");
        }
    });
}


exports.createNewMessage = function (req, res) {
    var userObject = JSON.parse(req.body.user);
    dbManager.getOtherUsers(userObject.user_id,function (users) {
        res.render('sendMessage', {userList: JSON.stringify(users), user: req.body.user});
    });
}

exports.testShowReceived = function (req, res) {
    messages.showReceived(receiverId, res);
};

exports.showUsingThreadId = function (req, res) {
    //console.log(req.body);
    messages.showRestrictedThread(req, res);
};

exports.test = function (req, res) {
    var receiverList = [
        {"id": "zrOX4lNOtZT557QbuudRl10I"},
        {"id": "AwRnGOS01TFUI3Kh9LJGYgDz"}
    ]
    var newMessage = new Object();
    newMessage.userId = "LSa8K6LrCQ3UAYCyH7BTMTd2";
    newMessage.message = "This is a message";
    newMessage.receiverList = receiverList;
    newMessage.threadId = "y8VmuukosAI6H0OVinLYiaWj";
    messages.add(newMessage, res);
};
