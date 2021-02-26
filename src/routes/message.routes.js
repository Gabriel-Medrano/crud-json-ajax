const {Router} = require('express');

const router = Router();

const messageCtrl = require('../controllers/message.controller');

//routes
//All
router.get('/',messageCtrl.viewsMessages);
//create
router.post('/message/create',messageCtrl.createMessage);
//view
router.get('/message/:id',messageCtrl.viewMessage)
//update
router.put('/message/update/:id',messageCtrl.updateMessage);
//remove
router.delete('/message/remove/:id',messageCtrl.removeMessage);

//Exports
module.exports = router;