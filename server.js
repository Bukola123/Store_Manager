const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 3000;
// json parser
app.use(express.json());

// routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/products', require('./routes/products'));
/*app.use('/api/v1/channels', require('./routes/channels'));*/

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
