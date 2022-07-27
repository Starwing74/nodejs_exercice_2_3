const express = require('express');
const app = express();
const PORT = 3000
const {planets} = require('./data');
const {heroes} = require('./data');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Welcome to my web server');
})

app.get('/planets', (req, res) => {res.send(planets); });

app.get('/planets/:id', (req, res) => {
    const tmpid = req.params.id;
    const tmpPlanets = planets.filter(({id}) => id === +tmpid);
    res.send(tmpPlanets);
})

app.get('/planets/color/:color', (req, res) => {
    const tmpColor = req.params.color;
    const tmpPlanets = planets.filter(({color}) => color === tmpColor);
    res.send(tmpPlanets);
})

app.get('/heroes', (req, res) => {res.send(heroes); });

app.get('/heroes/:id', (req, res) => {
    const tmpid = req.params.id;
    const tmpHeroes = heroes.filter(({id}) => id === +tmpid);
    res.send(tmpHeroes);
})

app.post('/heroes', (req,res) => {
    console.log(req.body)
    const newHero = {
        id: heroes.length + 1,
        name: req.body.name,
        origin: req.body.origin,
        power: req.body.power
    }
    console.log(newHero);
    heroes.push(newHero);
    res.send(newHero);
})

app.get('/heroes/origin/:ori', (req, res) => {
    const tmpori = req.params.ori;
    const tmpHeroes = heroes.filter(({origin}) => origin === tmpori);
    res.send(tmpHeroes);
})

app.delete('/heroes/:id', (req, res) => {
    const tmpid = req.params.id;
    const hero = heroes.filter(({id}) => id === +tmpid);
    if (hero) {
        const idx = heroes.findIndex((obj => obj.id == tmpid));
        heroes.splice(idx, 1);
        res.send(`Hero with id ${tmpid} is deleted`);
    } else {
        res.send(`Hero with id ${tmpid} doesn't exist`);
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})