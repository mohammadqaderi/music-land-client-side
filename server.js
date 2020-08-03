const express = require('express');

const app = express();

app.use(express.static('./dist/music-land-client-side'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/music-land-client-side' }
  );
});

app.listen(process.env.PORT || 8080);
