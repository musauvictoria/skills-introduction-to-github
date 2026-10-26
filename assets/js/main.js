const projects = [
  {
    name: "TaskFlow API",
    description: "REST API for team task management with role-based permissions.",
    tech: ["Node.js", "Express", "PostgreSQL"],
    url: "#",
  },
  {
    name: "Insight Dashboard",
    description: "Analytics dashboard with real-time charts and KPI reporting.",
    tech: ["JavaScript", "Tailwind", "Chart.js"],
    url: "#",
  },
  {
    name: "Docs Search",
    description: "Developer docs search interface with keyboard-first navigation.",
    tech: ["HTML", "CSS", "Fuse.js"],
    url: "#",
  },
];

const projectsGrid = document.getElementById("projects-grid");
const projectFilter = document.getElementById("project-filter");

function renderProjects(filter = "") {
  const query = filter.trim().toLowerCase();
  const filteredProjects = projects.filter((project) => {
    const haystack = `${project.name} ${project.tech.join(" ")}`.toLowerCase();
    return haystack.includes(query);
  });

  projectsGrid.innerHTML = filteredProjects
    .map(
      (project) => `
        <article class="project-card rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h4 class="text-lg font-semibold">${project.name}</h4>
          <p class="mt-2 text-sm text-slate-300">${project.description}</p>
          <p class="mt-3 text-xs text-cyan-300">${project.tech.join(" • ")}</p>
          <a class="mt-4 inline-block text-sm font-medium text-cyan-300 hover:text-cyan-200" href="${project.url}">View repository</a>
        </article>
      `
    )
    .join("");

  if (!filteredProjects.length) {
    projectsGrid.innerHTML = `<p class="text-sm text-slate-300">No projects match your search.</p>`;
  }
}

projectFilter.addEventListener("input", (event) => {
  renderProjects(event.target.value);
});

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const skillBar = entry.target.querySelector(".skill-bar");
      skillBar.style.width = `${entry.target.dataset.level}%`;
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll(".skill-item").forEach((item) => {
  skillObserver.observe(item);
});

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

function setError(field, message) {
  const errorElement = document.querySelector(`[data-error-for="${field}"]`);
  errorElement.textContent = message;
  errorElement.classList.toggle("hidden", !message);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const name = data.get("name").trim();
  const email = data.get("email").trim();
  const message = data.get("message").trim();

  let valid = true;

  if (!name) {
    setError("name", "Please enter your name.");
    valid = false;
  } else {
    setError("name", "");
  }

  if (!validateEmail(email)) {
    setError("email", "Please enter a valid email address.");
    valid = false;
  } else {
    setError("email", "");
  }

  if (message.length < 10) {
    setError("message", "Message should be at least 10 characters.");
    valid = false;
  } else {
    setError("message", "");
  }

  if (!valid) {
    formStatus.classList.add("hidden");
    return;
  }

  formStatus.textContent = "Thanks! Your message has been validated and is ready to send.";
  formStatus.classList.remove("hidden");
  contactForm.reset();
});

renderProjects();
