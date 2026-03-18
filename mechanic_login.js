// PANEL SWITCH (same as your login.js)
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});


// ================= SIGNUP =================
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const user = {
    name: document.getElementById("signupName").value,
    email: document.getElementById("signupEmail").value,
    password: document.getElementById("signupPassword").value,
    skills: document.getElementById("skills").value,
    location: document.getElementById("location").value,
    role: "mechanic"
  };

  localStorage.setItem(user.email, JSON.stringify(user));

  alert("Signup successful!");
});


// ================= LOGIN =================
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password && user.role === "mechanic") {

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    window.location.href = "index.html";

  } else {
    alert("Invalid Mechanic Login");
  }
});