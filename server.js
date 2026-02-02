const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const rates = {
  "EUR_USD": 1.10,
  "USD_EUR": 0.91,
  "EUR_GBP": 0.85
};

app.post("/convert", (req, res) => {
  const value = req.body.value;
  const conversion = req.body.conversion;

  const numericValue = Number(value);

  // ERRO: valor inválido ou não preenchido
  if (
    value === undefined ||
    value === "" ||
    isNaN(numericValue) ||
    numericValue < 0.01 ||
    numericValue > 100000
  ) {
    return res.send("Introduza um valor positivo válido.");
  }

  // ERRO: conversão inválida ou não selecionada
  if (!rates[conversion]) {
    return res.send("Selecione uma conversão válida.");
  }

  // SUCESSO
  const result = (numericValue * rates[conversion]).toFixed(2);
  return res.send(result);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor ativo em http://localhost:${PORT}`);
});
