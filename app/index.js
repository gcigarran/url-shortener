const express = require('express');
const statsDb = require('./config/statsDb');
const urlDb = require('./config/urlDb');
const app = express();
const config = require('config');

// Connect DB

urlDb.connectDb();
statsDb.connectDb();

app.use(express.json({extented: false}));

// Define Routes

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = config.get('port');

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

