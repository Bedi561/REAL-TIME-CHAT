const { Server } = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 10000;

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Update this to your frontend's URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data); // Broadcast the message
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
