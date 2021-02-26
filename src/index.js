require('dotenv').config();

const app = require('./server/config');

//Database
require('./database');

//Starting serve
app.listen(app.get('port'),() => {
    console.log('serve on port: ' + app.get('port'));
})