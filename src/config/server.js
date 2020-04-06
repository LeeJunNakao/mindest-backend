const express = require('express');
const env = require('./.env');

const openRoutes = require('./routes/openRoutes/routes');
const protectedRoutes = require('./routes/protectedRoutes/routes');
const adminRoutes = require('../config/routes/protectedRoutes/adminRoutes');
const cors = require('./middlewares/cors');

const app = express();

const PORT = env.PORT;

app.use(express.json({ limit: '5mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cors);

app.use('/static',express.static(process.cwd()+'/statics'))

openRoutes(app);
protectedRoutes(app,express);
adminRoutes(app,express);

app.listen(PORT,()=>{
    console.log(`Rodando na porta ${PORT}`)
})

