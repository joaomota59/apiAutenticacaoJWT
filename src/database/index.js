import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.j7jaulh.mongodb.net/?retryWrites=true&w=majority`;

async function connect() {
    mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log('Conectado ao banco de dados'))
    .catch((err) => console.log('Erro ao se conectar ao banco de dados!'));
  }

export default connect;