const grid = document.getElementById("labGrid");

fetch("http://localhost:3000/api/lab/public")
  .then(res => res.json())
  .then(labs => {
    if (labs.length === 0) {
      grid.innerHTML = "<p>No lab entries available yet.</p>";
      return;
    }

    labs.forEach(lab => {
      const card = document.createElement("div");
      card.className = "lab-card";

      card.innerHTML = `
        <h3>${lab.title}</h3>
        <p>${lab.summary}</p>
        <span class="lab-tag">${lab.tag}</span>
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    grid.innerHTML = "<p>Error loading lab content.</p>";
  
});
