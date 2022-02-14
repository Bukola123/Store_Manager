const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 3000;
// json parser
app.use(express.json());
//app.use(bodyParser.json);

// routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/category', require('./routes/category'));
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/carts', require('./routes/carts'))
app.use('/api/v1/sales', require('./routes/sales'))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
