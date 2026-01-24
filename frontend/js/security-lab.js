document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    lockUI();
    return;
  }

  fetch("http://security-lab-backend.onrender.com/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(user => {
      unlockUI();
      console.log("Authenticated as:", user.role);
    })
    .catch(lockUI);
});

function lockUI() {
  document.querySelectorAll(".lab-card").forEach(card => {
    card.classList.add("locked");
  });

  document.querySelectorAll(".requires-auth").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = "login.html";
    });
  });
}

function unlockUI() {
  document.querySelectorAll(".lab-card").forEach(card => {
    card.classList.remove("locked");
  });

  document.querySelectorAll(".requires-auth").forEach(link => {
    link.href = link.dataset.target;
  });
}
