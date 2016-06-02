/*jshint esversion: 6, node: true*/

'use strict';

import express from 'express';

let app = express();

app.use(express.static('public'));

let port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
