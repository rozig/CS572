const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Your web server is running on http://localhost:${port}`));