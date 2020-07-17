const express = require('express');
const router = express.Router();

const MasterProblemController = require('../controllers/master-problem-type');

router.post('/AddMasterProblemType', MasterProblemController.add_master_problem_type);

router.post('/UpdateMasterProblemType', MasterProblemController.update_master_problem_type);

router.get('/GetMasterProblemTypeList', MasterProblemController.get_master_problem_type_list);

router.get('/GetMasterProblemTypeDetailsById/:id', MasterProblemController.get_master_problem_type_details_by_id);

module.exports = router;