const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config'); // Make sure this path is correct

// Import your models
const Domain = require('./models/domain_M');
const Record = require('./models/Record');

const PORT = 8080;
const app = express();

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.log('Some error found:', error);
});

app.use(cors());
app.use(express.json());

// Import your routers
const domainRouter = require('./router/domain_Router');
const recordRouter = require('./router/record_Router');

// Use your routers
app.use('/domains', domainRouter);
app.use('/records', recordRouter);

app.listen(PORT, () => {
  console.log('Server Started');
});
