const password = document.querySelector("#password");
const passwordAgain = document.querySelector("#password-again");

password.addEventListener("input", checkPasswords);
passwordAgain.addEventListener("input", checkPasswords);

function checkPasswords() {
    let passwordVal = password.value;
    let passwordAgainVal = passwordAgain.value;

    if (passwordVal != passwordAgainVal) {
        password.style.border = "1px solid red";
        passwordAgain.style.border = "1px solid red";
    } else {
        password.style.border = "";
        passwordAgain.style.border = "";
    }
}