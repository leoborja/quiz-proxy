export default async function handler(req, res) {
  const path = req.url || "/";
  const cleanPath = path.replace(/^\/quiz_v1\//, "");
  const githubUrl = `https://leoborja.github.io/quiz_v1/${cleanPath}`;

  try {
    const response = await fetch(githubUrl);
    const text = await response.text();

    const modifiedText = text.replace(/(href|src)="([^"]*)"/g, (match, attr, path) => {
      if (path.startsWith("http")) return match;
      if (path.startsWith("//")) return match;
      return `${attr}="https://leoborja.github.io/quiz_v1/${path.replace(/^\//, "")}"`;
    });

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(modifiedText);
  } catch (err) {
    res.status(500).send("Erro ao buscar conteúdo do GitHub Pages");
  }
}