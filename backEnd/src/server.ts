import app from "./app";

const { PORT = 5000 } = process.env;

app.listen(PORT, listener);

function listener(){
    console.log(`OrderUp backend listening on Port ${PORT}!`);
}