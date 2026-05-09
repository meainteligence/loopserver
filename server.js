const express = require("express");
const fs = require("fs");

const app = express();

app.post("/visita", (req, res) => {
  const data = new Date().toISOString();

  fs.appendFile("visitas.csv", `${data}\n`, (err) => {
    if (err) {
      return res.status(500).send("erro");
    }

    res.send("ok");
  });
});

app.get("/total", (req, res) => {
  fs.readFile("visitas.csv", "utf8", (err, data) => {
    if (err) return res.json({ total: 0 });

    const linhas = data.trim() ? data.trim().split("\n") : [];
    res.json({ total: linhas.length });
  });
});

app.get("/painel", (req, res) => {
  fs.readFile("visitas.csv", "utf8", (err, data) => {
    const linhas = err || !data || !data.trim()
      ? []
      : data.trim().split("\n");

    res.send(`
      <html>
        <head>
          <meta charset="utf-8">
          <title>Painel de visitas</title>
        </head>
        <body style="font-family: Arial; padding: 30px;">
          <h1>Total de visitas: ${linhas.length}</h1>
          <h2>Últimas visitas</h2>
          <ul>
            ${linhas.slice(-20).reverse().map(v => `<li>${v}</li>`).join("")}
          </ul>
        </body>
      </html>
    `);
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando");
});