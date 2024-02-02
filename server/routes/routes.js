const {task,gettask,deleteTask} = require('../controller/tasks')
const {login,register,isLoggedin} = require('../controller/user');
 
const express = require('express')
const router = express.Router();

 
router.post('/tasks',task);
router.post('/login', login);
router.post('/register',register)
router.post('/delete/:id',deleteTask)

router.get('/tasks',gettask);




module.exports = router