const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Web server is running on http://localhost:${port}`));
