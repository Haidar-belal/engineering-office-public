const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/contractors', require('./routes/contractorRoute'));
app.use('/offices', require('./routes/officeRoute'));
app.use('/comments', require('./routes/commentRoute'));
app.use('/owners', require('./routes/ownerRoute'));
app.use('/advertisements', require('./routes/advertisementRoute'));

app.listen({ port: 4000}, async () => {
    // { focus: true }
    // sync();
    await sequelize.authenticate();
    console.log('starting');
});


