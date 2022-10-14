const { POST = 5000 } = process.env;

import app from "./app";

app.listen(POST, listener);

function listener(){
    console.log(`OrderUp backend listening on Port ${POST}!`);
}