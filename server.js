require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const swaggerAutogen = require('swagger-autogen')();
const authRoutes = require('./src/routes/authRoute.js');
const connectDB= require('./src/config/db.js');
const swaggerUi = require('swagger-ui-express');
const transactionRoutes= require('./src/routes/transactionRoute.js');   
const walletRoutes= require('./src/routes/walletRoute.js');


let swaggerDocument = {};
try {
    swaggerDocument = require('./swagger-output.json');
} catch (error) {
    console.error("error in loading swagger document: ", error)
}


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
connectDB()

const PORT= process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('Welcome to Phonepe Backend');
}); 


app.use('/api/auth', authRoutes)
app.use('/api/transaction', transactionRoutes)
app.use('/api/wallet', walletRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs is available at http://localhost:${PORT}/api-docs`);
    
});
