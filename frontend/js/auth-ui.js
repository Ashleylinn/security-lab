document.addEventListener("DOMContentLoaded", () => {
  const authSlot = document.getElementById("nav-auth");
  if (!authSlot) return;

  const token = localStorage.getItem("token");

  if (!token) {
    authSlot.innerHTML = `<a href="login.html">Login</a>`;
  } else {
    authSlot.innerHTML = `<a href="#" id="logout-btn">Logout</a>`;

    document.getElementById("logout-btn").addEventListener("click", e => {
      e.preventDefault();
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
  }
});
