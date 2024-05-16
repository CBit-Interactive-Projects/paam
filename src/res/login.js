const host = "https://vorbi.pockethost.io/"
import Pocketbase from "pocketbase"

const client = Pocketbase(host)
console.log("Connected to the host!")

window.onload = async function () {
    if (localStorage.getItem("pocketbase_auth")) {
        window.location = "./message.html";
    }
}

// buttons for signup
const signupBtn = document.getElementById("signupBtn")
const usernameInput = document.getElementById("usernameInput")
const passwordInput = document.getElementById("passwordInput")
const emailInput = document.getElementById("emailInput")
const passwordInput2 = document.getElementById("pass2Input")
//buttons for login
const loginBtn = document.getElementById("loginBtn")
const emailLogIn = document.getElementById("emailLog")
const passLogIn = document.getElementById("passLog")

// LoGiC aReA lEt'S gO!!!
signupBtn.addEventListener("click", async function(){
    signup(emailInput.nodeValue, passwordInput.nodeValue, passwordInput2.nodeValue, usernameInput.nodeValue)
}) // load the ```signup()``` function
loginBtn.addEventListener("click",
    async function(){
        login(emailLogIn.nodeValue, passLogIn.nodeValue)
    }
)

/**
 * Sign you up for Vorbi and chat app les go
 */
async function signup(email, password, confirm_pass, username){
    console.log("Sign up?!?!?!")
    try {
        var regex = /\d/g;
        if (!username.includes("@") && username.length >= 5 && username.length <= 15 && !regex.test(username) && password.length >= 8 && password == confirm_pass) {
            const signup_data = {
                email,
                username,
                password,
                passwordConfirm: confirm_password,
            }
            await client.collection('users').create(signup_data);
            await login(email, password);
        }
    } catch (err) {
        console.log(err)
    }
}

async function login(email, password){
    console.log("Logging in bois")
    if (email.includes("@")) {
        await client.collection('users').authWithPassword(email, password).then(() => {
            window.location.reload();
        });
    }
}