document.getElementById("registerForm").addEventListener("submit", async e => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const API_BASE = "https://security-lab-backend.onrender.com";

  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Registration failed");
    return;
  }

  alert("Account created. Please log in.");
  window.location.href = "login.html";
});
