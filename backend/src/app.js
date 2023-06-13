const express = require('express')
const { PORT } = require('./config');
const {run} = require('./database');

const auth = require('./routes/auth.router');
const post = require('./routes/post.router');
const authors = require('./routes/authors.router')
const cors = require('cors');

const app = express()

app.use(express.json({ extended: true }));
app.use(cors());

app.use(auth);
app.use(post);
app.use(authors);

async function start() {
    try{
        run().catch(console.dir);

    app.listen(PORT, () => {
        console.log(`Приложение запущенно http://localhost:${PORT}`);
    });
    }catch(e){
        console.log(e)
    }
}

start();