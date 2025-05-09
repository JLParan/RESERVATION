document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Example: Static admin login (replace this with server-side validation)
  if (email === "admin@example.com" && password === "admin123") {
    message.style.color = "lightgreen";
    message.textContent = "Login successful!";
    // Redirect or load dashboard here
  } else {
    message.style.color = "red";
    message.textContent = "Invalid credentials. Try again.";
  }
});
