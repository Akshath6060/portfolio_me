// Applies the stored or system theme before first paint so the loader and page
// never flash the wrong colours. Kept as an external file so the Content
// Security Policy can forbid inline scripts.
(() => {
  let saved;
  try { saved = localStorage.getItem("portfolio-theme"); } catch { /* Private mode blocks storage. */ }
  const theme = saved === "dark" || saved === "light" ? saved : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
})();
