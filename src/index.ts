import dotenv from 'dotenv';
import express from 'express';

// get server configuration port
const PORT = process.env.PORT || 5000

const app = express();
dotenv.config()





app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})