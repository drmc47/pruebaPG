const server = require('./app.js');
require('./database');
require('./database2');

// Syncing all the models at once.

  server.listen(8001, () => {
    console.log('Running server: port 8001:'); // eslint-disable-line no-console
  });

