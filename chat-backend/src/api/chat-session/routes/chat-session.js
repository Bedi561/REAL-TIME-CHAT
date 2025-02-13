module.exports = {
    routes: [
      {
        method: "GET",
        path: "/chat-sessions",
        handler: "ChatSession.find",
        config: {
          policies: []
        }
      },
      {
        method: "POST",
        path: "/chat-sessions",
        handler: "ChatSession.create",
        config: {
          policies: []
        }
      },
      {
        method: "GET",
        path: "/chat-sessions/:id",
        handler: "ChatSession.findOne",
        config: {
          policies: []
        }
      },
      {
        method: "DELETE",
        path: "/chat-sessions/:id",
        handler: "ChatSession.delete",
        config: {
          policies: []
        }
      }
    ]
  };
  