
export default async function handler(req, res) {
  const path = req.url || "/";
  const githubUrl = `https://leoborja.github.io/quiz_v1${path}`;

  try {
    const response = await fetch(githubUrl);
    const text = await response.text();

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(text);
  } catch (err) {
    res.status(500).send("Erro ao buscar conteúdo do GitHub Pages");
  }
}
