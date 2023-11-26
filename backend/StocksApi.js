const express = require('express');
const axios = require('axios');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/stocks', async (req, res) => {
  const n = req.query.n;
  const response = await axios.get(`https://api.polygon.io/v2/reference/tickers?sort=ticker&perpage=${n}&page=1&apiKeydCP5AMhDVJ4WdC3yLjDxyOHoBXybTHXr`);
  const stocks = response.data.results.map(stock => ({ symbol: stock.ticker, refreshInterval: Math.floor(Math.random() * 5) + 1 }));
  res.json(stocks);
});

app.get('/prices', (req, res) => {
  const symbol = req.query.symbol;
  const prices = JSON.parse(fs.readFileSync('prices.json'));
  const price = prices[symbol];
  res.json({ price });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
