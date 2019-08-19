const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
//Require route files
const seedData = require("./apis/seedingData/seedingData");
const { Client } = require('@elastic/elasticsearch');

//middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/apis/seedData", seedData);


const client = new Client({ node: 'http://localhost:9200' });
async function run () {
  // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })
  await client.index({
    index: 'game-of-thrones',
    body: {
      character: 'Daenerys Targaryen',
      quote: 'I am the mother of dragons.'
    }
  })
  await client.index({
    index: 'game-of-thrones',
    // here we are forcing an index refresh,
    // otherwise we will not get any result
    // in the consequent search
    refresh: true,
    body: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })
  // Let's search!
  const { body } = await client.search({
    index: 'game-of-thrones',
    body: {
      query: {
        match: {
          quote: 'winter'
        }
      }
    }
  })
  console.log(body.hits.hits)
}
run().catch(console.log)

app.get('/', function (req, res) {
    res.send('Hello World')
  })
   
app.listen(4200);