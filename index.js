const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const corsOptions = {
    origin: 'https://www.haxball.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(express.static('public'));

app.options('/addStats', cors());

app.post('/addStats', cors(corsOptions), (req, res) => {
    console.log(req.body);
    res.send('OK');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
