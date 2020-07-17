const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
// const sequelize = require('./api/util/database');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const applicationUserRoutes = require('./api/routes/applicationuser');
const authenticateRoutes = require('./api/routes/authenticate');
const masterPaymentMethod = require('./api/routes/masterpaymnetmethod');
const masterShippingMethod = require('./api/routes/master-shipping-method');
const customerProblem = require('./api/routes/customer-problem');
const masterProblemtType = require('./api/routes/master-problem-type');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Origin", "PUT, PATCH, GET, POST, DELETE");
        return res.status(200).json({});
    }
    next();
});

// app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/Product', productsRoutes);
app.use('/api/Order', ordersRoutes);
app.use('/api/ApplicationUser', applicationUserRoutes);
app.use('/api/Authenticate', authenticateRoutes);
app.use('/api/MasterPaymentMethod', masterPaymentMethod);
app.use('/api/MasterShippingMethod', masterShippingMethod);
app.use('/api/CustomerProblem', customerProblem);
app.use('/api/MasterProblemType', masterProblemtType);

app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// sequelize
// // .sync({ force: true })
//     .sync()

var http = require('http');
var server = http.createServer(app, function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    var message = 'It works with the server!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version].join('\n');
    res.end(response);
});
server.listen(console.log("Connected!"));