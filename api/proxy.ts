export default async function handler(req, res) {
  const path = req.url || "/";
  const baseUrl = "https://leoborja.github.io/quiz_v1";
  const githubUrl = `${baseUrl}${path}`;

  try {
    const response = await fetch(githubUrl);
    let html = await response.text();

    // Inject <base> tag depois da <head> para corrigir caminhos relativos
    html = html.replace("<head>", `<head><base href="${baseUrl}${path.endsWith("/") ? "" : "/"}">`);

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (err) {
    res.status(500).send("Erro ao buscar conteúdo do GitHub Pages");
  }
}
