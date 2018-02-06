
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ConversationsSchema = new Schema({
  messages: [{
    sender: { type: String, required: [true, 'sender name required'] },
    message: { type: String, required: [true, 'message contents required'] },
    created:{ type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('conversations', ConversationsSchema);
