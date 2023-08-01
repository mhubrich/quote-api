const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

// Use HTML front-end
app.use(express.static('public'));

// GET random quote
app.get('/api/quotes/random', (req, res, next) => {
    res.send({quote: getRandomElement(quotes)});
});

// GET all quotes || GET all quotes from person
app.get('/api/quotes', (req, res, next) => {
    if (Object.keys(req.query).length === 0) {
        res.send({quotes: quotes});
    } else {
        quotesByPerson = quotes.filter(quote => quote.person == req.query.person);
        res.send({quotes: quotesByPerson});
    }
});

// POST new quote
app.post('/api/quotes', (req, res, next) => {
    if ('quote' in req.query && 'person' in req.query) {
        quotes.push({quote: req.query.quote, person: req.query.person});
        res.send({quote: quotes[quotes.length-1]});
    } else {
        res.status(400).send();
    }
});

// Start the server
const PORT = process.env.PORT || 4001;
app.listen(PORT);