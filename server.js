//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/image-draw'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/image-draw/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
app.set("port",process.env.PORT || '8080')