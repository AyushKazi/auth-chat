import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { userAuth } from "@/context/AuthContext";
import { db } from "@/helper/firebase";

const ChatInput = () => {
  const [text, setText] = useState("");
  const { user } = userAuth(); // Supabase auth user
  const { name, picture } = user?.user_metadata || {};
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setIsLoading(true);
      await addDoc(collection(db, "messages"), {
        text,
        name: name || "Anonymous",
        picture: picture || null,
        createdAt: serverTimestamp(),
        senderId: user.id,
        senderEmail: user.email,
      });
      setText("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={sendMessage} className="flex gap-2 p-4 border-t">
      <input
        type="text"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border rounded px-4 py-2 disabled:text-gray-400"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default ChatInput;
