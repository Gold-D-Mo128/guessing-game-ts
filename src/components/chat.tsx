// app/chat/page.js
import React, { useEffect, useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Title from "./title"; // Update the import based on your actual structure

interface Message {
  sender: string;
  message: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const ws = new WebSocket("ws://localhost:4000"); // Update the URL based on your WebSocket server

  useEffect(() => {
    ws.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    return () => {
      ws.close();
    };
  }, [ws]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      const message: Message = { sender: "You", message: input.trim() };
      ws.send(JSON.stringify(message)); // Send message to the server
      setInput("");
    }
  };

  return (
    <div className="rounded-lg w-[90%] h-full flex flex-col">
      <Title icon={<ChatBubbleOutlineIcon />} title="Chat" />
      <div className="bg-gray-800 rounded-lg px-2 grow overflow-y-auto text-xs font-bold flex flex-col justify-end">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span
              className={`font-semibold ${
                msg.sender.startsWith("CPU") ? "text-pink-500" : "text-blue-500"
              }`}
            >
              {msg.sender}:
            </span>
            <span className="ml-2 text-gray-300">{msg.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 bg-slate-800 p-2">
        <input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          placeholder="Type your message..."
          className="flex-grow bg-gray-700 text-white rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Send
        </button>
      </form>
    </div>
  );
}
