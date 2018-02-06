'use strict';


var mongoose = require('mongoose'),
  Conversation = mongoose.model('conversations');

exports.create_new_message = function(req, res) {
  var new_message = {
    sender: req.body.sender,
    message: req.body.message
  };
  if (req.body.converstaion_id == null ) {
    var new_conversation = new Conversation({
        messages: [new_message]
    });
    new_conversation.save(function(err, conversation) {
      if (err)
        res.send(err);
      if(conversation)
        res.json({"status":"Success!", "conversation_id": conversation._id});
    });
  }
  else {
    Conversation.findById( req.body.converstaion_id,function (err, conv) {
      if (err)
        res.send(err);
     conv.messages.push(new_message);
     conv.save(function(err, conversation) {
       if (err)
         res.send(err);
       if(conversation)
         res.json({"status":"Success!", "conversation_id": conversation._id});
     });
   });
 }
}

exports.get_conversation_history = function(req, res) {
  Conversation.findById(req.params.id, '-__v -messages._id', function(err, conversation) {
    if (err)
      res.send(err);
    res.json(conversation);
  });
};
