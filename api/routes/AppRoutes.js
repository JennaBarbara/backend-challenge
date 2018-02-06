'use strict';
module.exports = function(app) {
  var ConversationList = require('../controllers/AppController');

  // todoList Routes
  app.route('/messages')
    .post(ConversationList.create_new_message);


  app.route('/conversations/:id')
    .get(ConversationList.get_conversation_history);
};
