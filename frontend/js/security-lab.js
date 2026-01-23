const token = localStorage.getItem("token");

if (!token) {
  lockLabs();
} else {
  fetch("http://localhost:3000/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    })
    .then(user => {
      unlockLabs();
      showUserState(user);
    })
    .catch(() => {
      lockLabs();
    });
}

function lockLabs() {
  document.querySelectorAll(".lab-card").forEach(card => {
    card.classList.add("restricted");
  });
}

function unlockLabs() {
  document.querySelectorAll(".lab-card").forEach(card => {
    card.classList.remove("restricted");
  });
}

function showUserState(user) {
  console.log("Authenticated as:", user.role);
}
