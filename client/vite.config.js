import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const DEFAULT_SITE_URL = "https://akshath-ok.vercel.app";

export default defineConfig(({ mode }) => {
  // Only VITE_-prefixed values are loaded, so a server-only secret in .env can
  // never be picked up here by accident.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  // Keep one replaceable fallback for deployments where VITE_SITE_URL has not
  // been configured. Vercel's generated project hostname may differ from the
  // public production alias, so it is not suitable as the canonical URL.
  const configuredUrl = env.VITE_SITE_URL || DEFAULT_SITE_URL;
  const siteUrl = configuredUrl.replace(/\/$/, "");
  return {
  plugins: [react(), {
    name: "site-url-metadata",
    transformIndexHtml(html) {
      if (siteUrl) return html.replaceAll("__SITE_URL__", siteUrl);
      return html
        .replace(/\s*<link rel="canonical"[^>]+>/, "")
        .replace(/\s*<meta property="og:url"[^>]+>/, "")
        .replaceAll("__SITE_URL__/assets/og.jpg", "/assets/og.jpg");
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
