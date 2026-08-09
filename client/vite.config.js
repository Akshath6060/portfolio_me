import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const configuredUrl = env.VITE_SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : "");
  const siteUrl = configuredUrl.replace(/\/$/, "");
  return {
  plugins: [react(), {
    name: "site-url-metadata",
    transformIndexHtml(html) {
      if (siteUrl) return html.replaceAll("__SITE_URL__", siteUrl);
      return html
        .replace(/\s*<link rel="canonical"[^>]+>/, "")
        .replace(/\s*<meta property="og:url"[^>]+>/, "")
        .replaceAll("__SITE_URL__/assets/hero.png", "/assets/hero.png");
    },
    generateBundle() {
      const sitemapLine = siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml` : "";
      this.emitFile({ type: "asset", fileName: "robots.txt", source: `User-agent: *\nAllow: /${sitemapLine}\n` });
      if (siteUrl) {
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}/</loc></url></urlset>\n`,
        });
      }
    },
  }],
  server: { port: 5173 },
  };
});
