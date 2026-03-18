// ================= PANEL SWITCH =================
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

  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const user = {
    name,
    email,
    password,
    role: "user" // ya "mechanic" (future use)
  };

  // 👉 store using email as key (better than single "user")
  localStorage.setItem(email, JSON.stringify(user));

  alert("Signup successful! Now login.");
});


// ================= LOGIN =================
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const savedUser = JSON.parse(localStorage.getItem(email));

  if (savedUser && password === savedUser.password) {

    // ✅ MAIN LINE (login state save)
    localStorage.setItem("loggedInUser", JSON.stringify(savedUser));

    // 🔥 redirect to role selection
    window.location.href = "index.html";

  } else {
    alert("Invalid email or password");
  }
});