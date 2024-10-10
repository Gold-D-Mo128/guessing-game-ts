// app/socket.ts
import { WebSocketServer } from "ws";
import http from "http";

// Create an HTTP server
const server = http.createServer();
const wss = new WebSocketServer({ server });

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("A user connected");

  // Handle incoming messages
  ws.on("message", (message) => {
    console.log("Received:", message);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle disconnection
  ws.on("close", () => {
    console.log("User disconnected");
  });
});

// Start the server
server.listen(3000, () => {
  console.log("WebSocket server running on port 3000");
});
