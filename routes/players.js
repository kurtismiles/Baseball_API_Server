
//routes for /players 
const playerRoutes = (app, fs, connection) => {

    var con = connection.con;

    //=====================
    //CREATE CRUD OPERATION			
    //=====================
    app.post('/players', (req, res) => {
        console.log(req);
        try {
            if (req.body.name && req.body.city && req.body.height && req.body.weight && req.body.bats && req.body.throws) {
                console.log('Request received');
                //validatePlayer here
                con.connect(function (err) {
                    con.query(`INSERT INTO players (name, city, height, weight, bats, throws) VALUES ('${req.body.name}', '${req.body.city}',
                 '${req.body.height}', '${req.body.weight}', '${req.body.bats}', '${req.body.throws}')`, function (err, result, fields) {
                        if (err) res.send(err);
                        if (result) res.status(201).send({
                            name: req.body.name,
                            cityID: req.body.city,
                            height: req.body.height,
                            weight: req.body.weight,
                            bats: req.body.bats,
                            throws: req.body.throws
                        });
                        if (fields) console.log(fields);
                    });
                });
            } else {
                res.status(400).send("invalid request message framing");
                console.log('Missing a parameter');
            }
        } catch (exception) { res.sendStatus(400); console.log(exception) }
    });

    //data validation for adding players to players table
    const validatePlayer = (name, city, height, weight, bats, throws) => {
        if (
            //check name
            (name.typeof === "String" && name.length > 0 && name.length < 128)
            //check city
            //check height
            //check weight
            //check bats
            //check throws
        ) {
            return true;
        }
        else {
            return false;
        }
    };

    //====================
    //READ CRUD OPERATIONS
    //====================

    //get all players
    app.get('/players', function (req, res) {
        console.log(req);
        try {
            con.connect(function (err) {
                con.query(`SELECT * FROM players`, function (err, result, fields) {
                    if (err) res.send(err);
                    if (result) res.status(200).send(result);
                });
            });
        } catch (exception) { res.status(400).send(); console.log(exception) }
    });

    //get player by name
    app.get('/players/:playerName', function (req, res) {
        console.log(req);
        try {
            con.connect(function (err) {
                con.query(`SELECT * FROM players WHERE players.name = ('${req.params.playerName}')`, function (err, result, fields) {
                    if (err) res.send(err);
                    if (result) res.status(200).send(result);
                    if (fields) console.log(fields);
                });
            });
        } catch (exception) {
            res.status(400).send();
            console.log(exception)
        };
    });

    //=====================
    //UPDATE CRUD OPERATION
    //=====================	
    app.put('/players/:playerName', function (req, res) {
        console.log(req);
        try {
            if (req.body.name && req.body.city && req.body.height && req.body.weight && req.body.bats && req.body.throws) {
                con.connect(function (err) {
                    con.query(`UPDATE players SET name='${req.body.name}', city='${req.body.city}', height='${req.body.height}', weight='${req.body.weight}', bats='${req.body.bats}', throws='${req.body.throws}' WHERE name='${req.params.playerName}'`,
                        function (err, result, fields) {
                            if (err) res.send(err);
                            if (result) res.status(200).send(result);
                            if (fields) console.log(fields);
                        });
                });
            } else {
                res.status(400).send("invalid request message framing");
                console.log('Missing a parameter');
            }
        } catch (exception) {
            res.status(400).send();
            console.log(exception);
        };
    });

    //=====================
    //DELETE CRUD OPERATION
    //=====================
    app.delete('/players/:playerName', function (req, res) {
        console.log(req);
        try {
            con.connect(function (err) {
                con.query(`DELETE FROM players WHERE name='${req.params.playerName}' LIMIT 1`, function (err, result, fields) {
                    if (err) res.send(err);
                    if (result) res.status(200).send(result);
                    if (fields) console.log(fields);
                });
            });
        } catch (exception) {
            res.status(400).send();
            console.log(exception);
        };
    });
}

module.exports = playerRoutes;