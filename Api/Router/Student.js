const express = require('express');
const router = express.Router();
const StudentController = require('../Controller/Student.js');

router.post('/post', StudentController.insert_student);



module.exports = router;