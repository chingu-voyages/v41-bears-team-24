require('dotenv').config();

import app from "./app";

const { PORT = 3001 } = process.env;

app.listen(3001, listener);

function listener(){
    console.log(`OrderUp backend listening on Port ${PORT}!`);
}