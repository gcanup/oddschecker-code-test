// const express = require('express');
// const app = express();
//const cors = require('cors');

//app.use(cors());

// app.get('/decimalOddsMoreThanTwo', (req, res) => {
//   var list = ["item1", "item2", "item3"];
//   res.json(list);

//   console.log('Sent list of items');

// });

// app.get('/decimalOddsLessThanTwo', (req, res) => {
//     // code here
// });

// app.listen(4000, () => {
//   console.log('Example app listening on port 4000!');
// });

const express = require('express');
const path = require('path');
const betData = require('./data/data.json')

const app = express();
const cors = require('cors');

app.use(cors());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/decimalOddsMoreThanTwo', (req,res) => {
    const filterData = betData.bets.filter(x => x.odds[0].oddsDecimal > 2)
    res.json(filterData);
    console.log('Sent array with oddsDesimal more than 2');
});

app.get('/decimalOddsLessThanTwo', (req,res) => {
  const filterData = betData.bets.filter(x => x.odds[0].oddsDecimal < 2)
  res.json(filterData);
  console.log('Sent array with oddsDesimal less than 2');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port);

console.log('App is listening on port ' + port);