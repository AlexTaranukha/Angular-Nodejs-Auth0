'use strict';

// Load dependencies
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

// JWT mifdleware implementation
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://ataranukha.auth0.com/.well-known/jwks.json"
  }),
  audience: '{http://localhost:3001/}',
  issuer: "{ataranukha@auth0.com}",
  algorithm: ['RS256']
});

// public route
app.get('/api/deals/public', (req, res)=>{
  let deals = [
    // array of public deals
    {
      id: 1234,
      name: 'Name of Product 1',
      description: 'Description of Product 1',
      originalPrice: 19.99, // Original price of product
      salePrice: 9.99 // Sale price of product
    },
    {
      id: 5678,
      name: 'Name of Product 2',
      description: 'Description of Product 2',
      originalPrice: 19.99, // Original price of product
      salePrice: 9.99 // Sale price of product
    }
  ];
  res.json(deals);
})

// private route
app.get('/api/deals/private', authCheck, (req, res)=>{
  let deals = [
    // array of private deals
    {
      id: 4321,
      name: 'Name of Product 3',
      description: 'Description of Product 3',
      originalPrice: 19.99, // Original price of product
      salePrice: 9.99 // Sale price of product
    },
    {
      id: 8765,
      name: 'Name of Product 4',
      description: 'Description of Product 4',
      originalPrice: 19.99, // Original price of product
      salePrice: 9.99 // Sale price of product
    }
  ];
  res.json(deals);
})

app.listen(3001);
console.log('Serving deals on localhost:3001');
