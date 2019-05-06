let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

require('./app/routes')(app);

app.listen(process.env.PORT || 3002, () => {
    console.log('Example app listening on port 3002!', process.env.PORT);
});