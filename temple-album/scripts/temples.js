document.addEventListener("DOMContentLoaded", () => {
  // ---------- Mobile Menu Toggle ----------
  const menuButton = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  // ---------- Footer Dynamic Content ----------
  const yearSpan = document.getElementById("currentyear");
  const lastModifiedPara = document.getElementById("lastModified");

  // Set current year
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;

  // Set last modified date of the document
  const lastModified = new Date(document.lastModified);
  const options = { year: "numeric", month: "long", day: "numeric" };
  lastModifiedPara.textContent = `Last updated: ${lastModified.toLocaleDateString(undefined, options)}`;
});
