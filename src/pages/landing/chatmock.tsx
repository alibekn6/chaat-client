import type { ReactNode } from "react";
import shapeImage from "../../assets/Shape.svg";

interface Msg {
  from: "bot" | "user";
  content: ReactNode;
}

const messages: Msg[] = [
  { from: "user", content: "/start" },
  {
    from: "bot",
    content: (
      <>
        Hello, welcome to reeply, what can I help you with?
        <div className="flex space-x-2 mt-3">
          <button className="bg-blue-400 px-3 py-2 rounded text-sm">❓</button>
          <button className="bg-blue-400 px-3 py-2 rounded text-sm">🗺️</button>
          <button className="bg-blue-400 px-3 py-2 rounded text-sm">💬</button>
        </div>
      </>
    ),
  },
  { from: "user", content: "❓ what is reeply?" },
  {
    from: "bot",
    content: (
      <>
         ❓ Reeply is a platform for creating telegram bots.
      </>
    ),
  },
  { from: "user", content: "💬 how to create a bot?" },
  {
    from: "bot",
    content: <>Check this video <a className="underline text-blue-500" href="https://youtu.be/tPVdosq1OUs" target="_blank" rel="noopener noreferrer">here</a> </>,
  },
];
const Bubble = ({
  children,
  from,
}: {
  children: ReactNode;
  from: "bot" | "user";
}) => {
  const base = "relative px-5 pt-2 pb-6 text-sm max-w-[280px]";
  const isBot = from === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={
          `${base} ` +
          `${isBot ? "bg-gray-100 text-black rounded-xl" : "bg-blue-500 text-white rounded-xl"}`
        }
      >
        {children}
        <span
          className={
            `absolute bottom-1 right-2 text-xs flex items-center space-x-1 ` +
            `${isBot ? "text-gray-500" : "text-white opacity-75"}`
          }
        >
          <span>14:39</span>
          <img src={shapeImage} alt="read" className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};

export const ChatMockup = () => {
  return (
    <div className="chat-container w-full max-w-[320px] lg:max-w-[300px] mx-auto space-y-3 px-4 lg:px-0">
      {messages.map((msg, i) => (
        <div
          key={i}
          className="opacity-0 fade-in-up"
          style={{ animationDelay: `${i * 500}ms` }}
        >
          <Bubble from={msg.from}>{msg.content}</Bubble>
        </div>
      ))}
    </div>
  );
};
