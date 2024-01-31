const {task,deleteTask} = require('../controller/tasks')
const {login,register,isLoggedin} = require('../controller/user');
 
const express = require('express')
const router = express.Router();


router.post('/delete', deleteTask)
router.post('/tasks',task);
router.post('/login', login);
router.post('/register',register)





module.exports = router