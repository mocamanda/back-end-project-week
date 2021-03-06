// npm or yarn init -y

const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const server = express();

const userRouter = require('./routers/userRouter');
const notesRouter = require('./routers/notesRouter');

// const corsOptions = {
//   origin: 'https://amanda-lambdanotes.netlify.com',
//   credentials: true
// };

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

mongoose
  .connect('mongodb://amanda:amanda@ds133550.mlab.com:33550/lambdanotes-backend')
  .then(() => console.log('mLab Connected to Mongo'))
  .catch((err) => console.log(err))

server.get('/', (req, res) => {
  res.send({ API: 'Running' });
});

server.use('/Users', userRouter);
server.use('/Notes', notesRouter);

notesRouter(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`API running on ${PORT}`)
);

module.exports = { server };