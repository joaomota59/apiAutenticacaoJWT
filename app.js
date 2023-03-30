import express from 'express';

import routes from './src/routes/index.js'

import connect from './src/database/index.js';

connect(); // Connect to database

const app = express();

app.use(express.json());

app.use(routes);

app.listen((process.env.PORT || 3000), () => {
    console.log('Servidor está ativo!');
 });
