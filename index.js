const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/addStats', (req, res) => {
  console.log(req.body);
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
