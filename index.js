const express = require('express');
const cors = require('cors');
const basicAuth = require('express-basic-auth')
const config = require('./config');
const fs = require('fs');
const https = require('https');

const options = {
    key: fs.readFileSync(config.privatekey),
    cert: fs.readFileSync(config.certificate),
};

const app = express();
const plainPort = 3000;
const sslPort = 3001;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const {firstBy} = require('thenby');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ games: [], recordings: [], idSeq: 0 }).write();

app.use(express.json());
app.use(express.static('frontend/dist'));

// POST GAME
const corsOptions = {
    origin: 'https://www.haxball.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.options('/api/games', cors(corsOptions));
app.post('/api/games', cors(corsOptions), basicAuth(config.basicAuth), (req, res) => {
    const nextId = db.get('idSeq').value();
    db.update('idSeq', n => n + 1).write();
    db.get('games')
        .push({id: nextId, ...req.body})
        .write();
    console.log(`game saved: ${nextId}`);

    res.send(`${config.baseUrl}/games/${nextId}`);
});

// GET LIST OF GAMES
app.get('/api/games', (req, res) => {
    res.send(db.get('games').value().map(game => {
      // do not send recording to the client
      const { rec, ...rest } = game;
      return rest
    }));
});

// GET GAME
app.get('/api/games/:gameId', (req, res) => {
    const value = db.get('games')
        .find({id: parseInt(req.params.gameId)})
        .value();
    res.send(value ? value : 404);
});

// GET REPLAY
app.get('/api/games/:gameId/replay', (req, res) => {
    res.redirect(`https://www.haxball.com/replay?v=3#${config.baseUrl}/api/games/${req.params.gameId}/replay-data`);
});

app.get('/api/games/:gameId/replay-data', cors(corsOptions), (req, res) => {
    const game = db.get('games').find({id: parseInt(req.params.gameId)}).value();
    if (!game || !game.rec) {
        return res.status(404).send('Replay not found');
    }

    // Decode from base64 → binary
    const binary = Buffer.from(game.rec, 'base64');

    // Set headers for binary response
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="replay-${game.id}.hbr"`);

    res.send(binary);
})

// GET RATINGS
function hasWon(g, p) {
    return g.players.filter(pl => pl.name === p)[0].team !== (g.scores.red < g.scores.blue ? 1 : 2);
}
app.options('/api/ratings', cors());
app.get('/api/ratings', cors(corsOptions), (req, res) => {
    const games = db.get('games').value();
    const ratings = Array.from(new Set(games.flatMap(g => g.players).map(p => p.name)))
        .map(p => {
            const gamesPlayed = games
                .sort(firstBy('start', {direction: 'desc'}))
                .filter(g => g.players.filter(p => p.team === 1).length === g.players.filter(p => p.team === 2).length)
                .slice(0, 20)
                .filter(g => g.players.filter(pl => pl.name === p).length)
            return {
                name: p,
                won: gamesPlayed.filter(g => hasWon(g, p)).length,
                played: gamesPlayed.length
            };
        })
        .filter(g => g.played > 2)
        .map(p => ({...p, rating: p.won / (p.played)}))
        .sort(firstBy('rating', {direction: 'desc'}).thenBy('name'))
    res.send(ratings);
});

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/frontend/dist/index.html');
});

app.listen(plainPort, () => { console.log(`Express server listening on plain port ${plainPort}`) } );

https.createServer(options, app).listen(sslPort, () => {
  console.log(`Express server listening on SSL port ${sslPort}`);
});
