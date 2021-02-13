const path = require('path');
const http = require('http');
const express = require('express');


const publicPath = path.join(__dirname, '/../public');

const app = express();

app.use(express.static(publicPath));


const port = process.env.PORT || 3000

app.listen(port, ()=> console.log(`server listening on port ${port}`));
