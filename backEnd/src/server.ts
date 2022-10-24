require('dotenv').config();

import app from "./app";

const { PORT = 5000 } = process.env;

app.listen(PORT, listener);

function listener(){
    console.log(`Order Up backend listening on Port ${PORT}!`);
}