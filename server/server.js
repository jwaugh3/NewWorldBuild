const axios = require('axios');
const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const cors = require('cors');

//cors setup 
app.use(cors({ origin: '*' }));
app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.header('Access-Control-Allow-Origin', '*' );

	// Request methods you wish to allow
	res.header('Access-Control-Allow-Methods', 'GET, POST');

	// Pass to next layer of middleware 
	next();
});


app.use('/api', apiRoutes);

app.listen(3000, () =>
  console.log('app listening on port 3000'),
);