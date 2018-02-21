'use strict';


var mongoose = require('mongoose'),
  Conversation = mongoose.model('conversations');

exports.create_new_message = function(req, res) {
  var new_message = {
    sender: req.body.sender,
    message: req.body.message
  };
  if (req.body.conversation_id == null ) {
    Create_New_Conversation(req, res, new_message);
  }
  else {
    Add_To_Conversation(req, res, new_message);
 }
}

exports.get_conversation_history = function(req, res) {
  Conversation.findById(req.params.id, function(err, conversation) {
    if (err) {
      res.status(400);
      res.send(err);
    }
    res.json(conversation);
  });
};

function Create_New_Conversation(req, res, new_message ) {
  var new_conversation = new Conversation({
      messages: [new_message]
  });
  new_conversation.save(function(err, conversation) {
    if (err) {
      res.status(400);
      res.send(err);
    }
    if(conversation)
      res.json({"status":"201", "conversation_id": conversation._id});
  });
};

function Add_To_Conversation(req, res, new_message) {
    Conversation.findById( req.body.conversation_id, function (err, conv) {
      if (err) {
        res.status(400);
        res.send(err);
      }
    if (conv) {
       conv.messages.push(new_message);
       conv.save(function(err, conversation) {
         if (err) {
           res.status(400);
           res.send(err);
         }
       if(conversation)
         res.json({"status":"200", "conversation_id": conversation._id});
     });
   } else {
     res.status(400);
     res.json({"status":"400"});
   }
   });
};
