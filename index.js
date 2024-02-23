import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




app.use(express.static(`${__dirname}/public`));



io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat', (msg) => {
        io.emit('chat', msg);

        console.log(msg);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
