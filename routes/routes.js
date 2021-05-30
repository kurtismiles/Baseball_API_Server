const playerRoutes = require('./players');
const connection = require('../db_connect');

const appRouter = (app, fs) => {

    app.get('/', (req, res) => {
        res.send('Welcome to the baseball-app api-server');
    });

    playerRoutes(app, fs, connection);

};

module.exports = appRouter;