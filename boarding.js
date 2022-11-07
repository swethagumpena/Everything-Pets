function signInOut() {
    var signInButton = document.getElementById("sign-in");
    if (signInButton.innerText== "Sign in") {
        $("#sign-in").text('Log Out');
    } else if (signInButton.innerText == "Log Out") {
        $("#sign-in").text('Sign in');
    }
}