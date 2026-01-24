document.getElementById("loginForm").addEventListener("submit", async e => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const API_BASE = "https://security-lab-backend.onrender.com";

  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Login failed");
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);

  window.location.href = "security-lab.html";
});
