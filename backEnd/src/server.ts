require('dotenv').config();
const { PORT = 5000 } = process.env;

import app from "./app";

app.listen(PORT, listener);

function listener() {
    console.log(`OrderUp backend listening on Port ${PORT}!`);
}