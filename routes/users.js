const usersRoutes = (app, fs) => {

    // variables
    const dataPath = './data/users.json';


    // refactored helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
    // route to user 
    app.get('/users/:name', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["uid"];
            data[userId] = JSON.parse(req.body.data);

            readFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId}`);
            });
        },
            true);
    });

    // CREATE
    app.post('/users', (req, res) => {

        readFile(data => {
            const newUserId = Object.keys(data).length + 1;
    
            // add the new user
            data[newUserId.toString()] = req.body
    
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    });

    // UPDATE
    app.put('/users/:uid', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["uid"];
            data[userId] = JSON.parse(req.body.data);

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    });


// DELETE
app.delete('/users/:uid', (req, res) => {

    readFile(data => {

        // add the new user
        const userId = req.params["uid"];
        delete data[userId];

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`users id:${userId} removed`);
        });
    },
        true);
});
};

module.exports = usersRoutes;
