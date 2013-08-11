/**
 * Created with IntelliJ IDEA.
 * User: vicky
 * Date: 12/08/13
 * Time: 3:12 AM
 * To change this template use File | Settings | File Templates.
 */
function validateMessage() {
    var message = document.forms["send-message"]["message"].value;
    var receiverList = document.forms["send-message"]["receiverList"].value;
    if (message == "" || message == null) {
        alert("Please Type a Message");
        return false;
    }
    return true;
}

