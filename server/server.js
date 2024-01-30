const express = require('express');
const dbConnect = require('./config/db');
const app = express();

const port = process.env.PORT || 6000;

const userRoutes = require('./routes/user')
app.use(express.json());
app.use('/api/users/',userRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})

dbConnect();