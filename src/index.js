const express = require('express');

const expressConfig = require('./config/expressConfig');
const dbConnect = require('./config/dbConfig');
const handlebarsConfig = require('./config/handlebarsConfig');

const { PORT } = require('./config/constants');
const routes = require('./routes')

const app = express();

expressConfig(app)
handlebarsConfig(app)

dbConnect()
.then(console.log('Db connected!'))
.catch((err) => console.log(`Db error ${err}`))

app.use(routes)

app.listen(PORT, () => console.log(`Server started on port ${PORT}..`))

