/**
 * Created with IntelliJ IDEA.
 * User: vicky
 * Date: 11/08/13
 * Time: 6:19 PM
 * To change this template use File | Settings | File Templates.
 */
function validateForm() {
    var name = document.forms["signup-form"]["name"].value;
    var email = document.forms["signup-form"]["email"].value;
    var userName = document.forms["signup-form"]["user"].value;
    var password = document.forms["signup-form"]["pass"].value;
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");

    if (name == "" || name == null) {
        alert("Enter your Name please");
        return false;
    }
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        alert("Not a valid e-mail address");
        return false;
    }
    if (userName == "" || userName == null) {
        alert("Enter User Login please");
        return false;
    }
    if (password == "" || password == null) {
        alert("Password field cannot be left empty");
        return false;
    }
    return true;
}
