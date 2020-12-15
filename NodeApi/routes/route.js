const express = require('express');
const router = express.Router();

//controllers
const userController = require('../controllers/user')
const messageController = require('../controllers/message')
//middleware
const verifyToken = require('../middleware/auth');
//user Routes
router.get('/users',userController.all_users);
router.get('/user/:id',userController.get_user);
router.post('/user',userController.add_user);
router.delete('/user/:id',userController.delete_user);
router.put('/user/:id',userController.update_user);
router.post('/login',userController.login)
//mesage Routes
router.get('/messages',messageController.all_messages);
router.get('/message/:id',messageController.get_message);
router.post('/message',verifyToken,messageController.add_msg);
router.delete('/message/:id',messageController.delete_message);
router.put('/message/:id',messageController.update_message);

module.exports = router;