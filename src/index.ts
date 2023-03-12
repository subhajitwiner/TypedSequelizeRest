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


const port = process.env.PORT || 4000;
// app.listen(port, () => console.log(`Listening on port ${port}..`));
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
app.use('/', indexRouter.route());