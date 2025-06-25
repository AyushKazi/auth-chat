import { useEffect, useRef, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { db } from "@/helper/firebase";
import reactSvg from "../assets/react.svg";
import { userAuth } from "@/context/AuthContext";

const MessageList = () => {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const { user } = userAuth();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg) => {
        const isMe = msg.senderId === user.id; // replace `user` with your context user
        console.log("msg", msg.picture);

        return (
          <div
            key={msg.id}
            className={`mb-2 flex ${isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex  items-center gap-4 p-2 rounded max-w-[80%] ${
                isMe
                  ? " text-white rounded-br-none flex-row-reverse"
                  : " text-white rounded-bl-none"
              }`}
            >
              <img
                src={msg.picture ? msg.picture : reactSvg}
                alt="user avatar"
                className="h-10 w-10 rounded-full"
              />

              <div className="flex flex-col gap-1">
                {!isMe && (
                  <span className="font-semibold text-sm">{msg.name}</span>
                )}
                <span className="text-base font-light">{msg.text}</span>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
