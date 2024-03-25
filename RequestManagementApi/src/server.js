const express = require('express');
const cors = require('cors');

const app = express();
const port = 8300;
const routes = require('./router');

app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});