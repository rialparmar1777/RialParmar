document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.querySelector(".mobile-menu");
  const menu = document.querySelector(".menu");

  mobileMenu.addEventListener("click", function () {
    menu.classList.toggle("show");
  });
});

//Improving Local Storage - Handling by appending users
function processRegistration(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let registeredUsers = localStorage.getItem("RegisteredUsers") || "";
  registeredUsers += username + ":" + password + ";";
  localStorage.setItem("RegisteredUsers", registeredUsers);
  alert("You have successfully registered!")
  document.getElementById("registrationForm").reset();
}

function processLogin(event) {
  event.preventDefault();
  let usernameEntered = document.getElementById("username").value;
  let passwordEntered = document.getElementById("password").value;

  //alert("login simulation");
  // Retrieving data from localStorage
  const registeredUsers = localStorage.getItem("RegisteredUsers");
  //console.log(registeredUsers);
  let loginStatus = false;
  let message = "";
  if (registeredUsers != null) {
    let usernamePasswordPairs = registeredUsers.split(";");
    //console.log(usernamePasswordPairs[0]);
    for (let i = 0; i < usernamePasswordPairs.length; i++) {
      //console.log(usernamePasswordPairs[i]);
      if (usernamePasswordPairs[i] != " ") {
        let registeredUsername = usernamePasswordPairs[i].split(":")[0];
        let registeredPassword = usernamePasswordPairs[i].split(":")[1];
        console.log(registeredUsername);
        console.log(registeredPassword);
        if (
          usernameEntered == registeredUsername &&
          passwordEntered == registeredPassword
        ) {
          loginStatus = true;
          break;
        }
      }
    }
    message = loginStatus
      ? "login success"
      : "login failed, invalid credentials";
  } else {
    message = "no one has registered!";
  }
  alert(message);
  if (loginStatus) {
    window.location.href = "index.html"; // Redirect on successful login
  }
}
