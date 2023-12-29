import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import { IndexRouter } from './router';
import cors from 'cors';
import http from 'http';

const app = express();
const indexRouter = new IndexRouter();
app.use(cors());
app.use(bodyParser.json());
app.use(compression());


const port = process.env.PORT;
const server = http.createServer(app);

server.listen(port, startServer);
function startServer(){
  console.log(`Server running on my http://localhost:${port}/`);
}
app.use('/', indexRouter.route());
