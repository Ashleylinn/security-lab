const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/api/auth/login", {
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

  console.log("Logged in as:", data.role);

  if (data.role === "admin") {
    window.location.href = "/frontend/admin/dashboard.html";
  } else {
    window.location.href = "/frontend/security-lab.html";
  }
});
