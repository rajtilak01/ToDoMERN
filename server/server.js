const express = require('express');
const dbConnect = require('./config/db');
const app = express();

const cookieParser = require("cookie-parser");
const cors = require('cors')

app.use(cors());
app.use(cookieParser());

require('dotenv').config({ path: '.env.local' });
 

const port = process.env.PORT || 6000;

const routes = require('./routes/routes')

app.use(express.json());
app.use('/api/v1/',routes);


dbConnect();

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})
