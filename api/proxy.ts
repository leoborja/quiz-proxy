import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Sempre busca o conteúdo de go-us-shein-spa
    const githubUrl = "https://leoborja.github.io/quiz_v1/go-us-shein-spa/";
    
    const response = await fetch(githubUrl);
    if (!response.ok) {
      throw new Error(`GitHub Pages returned ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    const content = await response.text();

    // Define os headers apropriados
    res.setHeader("Content-Type", contentType || "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    
    // Retorna o conteúdo
    res.status(200).send(content);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to fetch content" });
  }
}