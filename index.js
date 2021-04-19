const express = require('express');
const cors = require('cors');
const basicAuth = require('express-basic-auth')
const config = require('./config');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ games: [], recordings: [], idSeq: 0 }).write();

app.use(express.json());
app.use(express.static('frontend/dist'));

let s3;
if (config.aws) {
    s3 = config.aws && new AWS.S3({
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
        signatureVersion: 'v4',
        region: config.aws.region,
    });
}

// POST GAME
const corsOptions = {
    origin: 'https://www.haxball.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.options('/games', cors());
app.post('/games', cors(corsOptions), basicAuth(config.basicAuth), (req, res) => {
    const nextId = db.get('idSeq').value();
    db.update('idSeq', n => n + 1).write();
    db.get('games')
        .push({id: nextId, ...req.body, rec: undefined})
        .write();
    console.log(`game saved: ${nextId}`);

    // upload to aws
    if (config.aws) {
        const params = {
            Bucket: config.aws.bucketName,
            Key: nextId + '.hbr2',
            Body: Buffer.from(req.body.rec, 'base64')
        };
        s3.upload(params, function (err) {
            if (err) {
                throw err;
            }
            console.log(`replay uploaded successfully to S3`);
        });
    }

    res.send(config.summaryUrl + nextId);
});

// GET LIST OF GAMES
app.get('/games', (req, res) => {
    res.send(db.get('games'));
});

// GET GAME
app.get('/games/:gameId', (req, res) => {
    const value = db.get('games')
        .find({id: parseInt(req.params.gameId)})
        .value();
    res.send(value ? value : 404);
});

// GET REPLAY
app.get('/games/:gameId/replay', (req, res) => {
    const presignedGETURL = s3.getSignedUrl('getObject', {
        Bucket: config.aws.bucketName,
        Key: req.params.gameId + '.hbr2',
        Expires: 100 //time to expire in seconds
    });
    res.redirect('https://www.haxball.com/replay?v=3#' + presignedGETURL);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
