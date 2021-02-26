
const messageControl = {};

const Message = require('../models/message.model');

messageControl.viewsMessages = async (req,res) => {
    const messages = await Message.find().sort({createdAt: 'desc'});
    res.json({messages});
}   

messageControl.createMessage = async (req,res) => {
    const Msg = [];
    const { name,email,description } = req.body;
    if(name === '' || email === '' || description === '') {
        Msg.push({text: 'Llene los datos'});
    }
    if(Msg.length > 0) {
        // res.json({Msg,name,email})
        res.json({Msg});
    }else {
        const message = new Message({name,email,description});
        await message.save();
        res.json(true);
    }
   
}

messageControl.viewMessage = async (req,res) => {
    const {id} = req.params;
    const message = await Message.findById(id);
    res.json({message});
}

messageControl.updateMessage = async (req,res) => {
    const {id} = req.params;
    const Msg = [];
    const {name,description} = req.body;
    if(name === '' || description === '') {
        Msg.push({text: 'the Inputs not is White'});
    }
    if(Msg.length > 0) {
        res.json({Msg});
    }else {
        const message = { name,description };
        await Message.findByIdAndUpdate(id,{$set: message},{new: true});
        res.json(true);
    }
    
}

messageControl.removeMessage = async (req,res) => {
    const {id} = req.params;
    await Message.findByIdAndRemove(id);
    res.json(true);
}

//Exports
module.exports = messageControl;