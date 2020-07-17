const express = require('express');
const router = express.Router();

const userAuth = require('../middleware/check-auth');

const customerProblemController = require('../controllers/customer-problem');

router.post('/AddCustomerProblem', customerProblemController.add_customer_problem);

router.post('/SolveCustomerProblem/:id', customerProblemController.solve_customer_problem);

router.get('/GetAllCustomerProblem', customerProblemController.get_all_customer_problem);

module.exports = router;