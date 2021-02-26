const {Schema,model} = require('mongoose');

const messageSchema = new Schema({
    name: {type:String, required: true},
    email: {type: String, required: true},
    description: {type: String, required: true}
},{
    timestamps: true
});

//exports
module.exports = model('message',messageSchema);