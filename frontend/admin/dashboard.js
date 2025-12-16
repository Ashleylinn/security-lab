const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "admin") {
  window.location.href = "login.html";
}

const API_BASE = "http://localhost:3000/api";

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}

function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.add("hidden");
  });

  document.getElementById(sectionId).classList.remove("hidden");
  document.getElementById("section-title").innerText =
    sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

async function addSkill() {
  const body = {
    category: document.getElementById("skill-category").value,
    title: document.getElementById("skill-title").value,
    description: document.getElementById("skill-desc").value
  };

  const res = await fetch(`${API_BASE}/admin/skills`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body)
  });

  if (!res.ok) return alert("Failed to add skill");

  alert("Skill added");
  loadSkills();
}

async function loadSkills() {
  const res = await fetch(`${API_BASE}/skills`);
  const skills = await res.json();

  const container = document.getElementById("skills-container");
  container.innerHTML = "";

  skills.forEach(skill => {
    container.innerHTML += `
      <div class="card">
        <h3>${skill.title}</h3>
        <p>${skill.description}</p>
        <span>${skill.category}</span>
        <button onclick="deleteSkill(${skill.id})">Delete</button>
      </div>
    `;
  });
}

async function deleteSkill(id) {
  if (!confirm("Delete this skill?")) return;

  await fetch(`${API_BASE}/admin/skills/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });

  loadSkills();
}

async function addCertification() {
  const body = {
    name: document.getElementById("cert-name").value,
    issuer: document.getElementById("cert-issuer").value,
    year: document.getElementById("cert-year").value,
    credential_url: document.getElementById("cert-url").value
  };

  const res = await fetch(`${API_BASE}/admin/certifications`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body)
  });

  if (!res.ok) return alert("Failed to add certification");

  alert("Certification added");
  loadCertifications();
}

async function loadCertifications() {
  const res = await fetch(`${API_BASE}/certifications`);
  const certs = await res.json();

  const container = document.getElementById("certifications-container");
  container.innerHTML = "";

  certs.forEach(cert => {
    container.innerHTML += `
      <div class="card">
        <h3>${cert.name}</h3>
        <p>${cert.issuer} · ${cert.year}</p>
        ${
          cert.credential_url
            ? `<a href="${cert.credential_url}" target="_blank">View</a>`
            : ""
        }
        <button onclick="deleteCertification(${cert.id})">Delete</button>
      </div>
    `;
  });
}

async function deleteCertification(id) {
  if (!confirm("Delete this certification?")) return;

  await fetch(`${API_BASE}/admin/certifications/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });

  loadCertifications();
}

async function addLab() {
  const body = {
    title: document.getElementById("lab-title").value,
    summary: document.getElementById("lab-summary").value,
    tag: document.getElementById("lab-tag").value,
    is_public: document.getElementById("lab-public").checked
  };

  const res = await fetch(`${API_BASE}/admin/labs`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body)
  });

  if (!res.ok) return alert("Failed to add lab");

  alert("Lab entry added");
  loadLabs();
}

async function loadLabs() {
  const res = await fetch(`${API_BASE}/labs?admin=true`, {
    headers: authHeaders()
  });

  const labs = await res.json();
  const container = document.getElementById("labs-container");
  container.innerHTML = "";

  labs.forEach(lab => {
    container.innerHTML += `
      <div class="card">
        <h3>${lab.title}</h3>
        <p>${lab.summary}</p>
        <span>${lab.tag}</span>
        <small>${lab.is_public ? "Public" : "Private"}</small>
        <button onclick="deleteLab(${lab.id})">Delete</button>
      </div>
    `;
  });
}

async function deleteLab(id) {
  if (!confirm("Delete this lab entry?")) return;

  await fetch(`${API_BASE}/admin/labs/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });

  loadLabs();
}

document.addEventListener("DOMContentLoaded", () => {
  loadSkills();
  loadCertifications();
  loadLabs();
});
