const express = require('express');
const server = express();
const PORT = 3000;

const fs = require('fs');

let rawdata = fs.readFileSync('data.json');
let users = JSON.parse(rawdata);

server.use(express.static('public'))

//users GET endpoint
server.get('/api/users', (req, res) => {
    res.status(200).send(users);
  });

//users POST endpoint  
server.post('/api/posts', function (req, res) {
    res.status(200);
    res.send('POST request to the homepage');
})  

server.listen(PORT, () => {
    console.log('server started on port 3000')
}) 

