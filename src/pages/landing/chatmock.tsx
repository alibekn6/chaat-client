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
        Hello, welcome to AI generated bot, what can I help you with?
        <div className="flex space-x-2 mt-2">
          <button className="bg-blue-400 px-2 py-1 rounded">🏷️</button>
          <button className="bg-blue-400 px-2 py-1 rounded">🗺️</button>
          <button className="bg-blue-400 px-2 py-1 rounded">☎️</button>
        </div>
      </>
    ),
  },
  { from: "user", content: "🗺️ location" },
  {
    from: "bot",
    content: (
      <>
        🗺️ We are located in Satbayeva 22
        <br />
        <a
          href="https://go.2gis.com/oXHPl"
          target="_blank"
          rel="noopener"
          className="underline"
        >
          https://go.2gis.com/oXHPl
        </a>
      </>
    ),
  },
  { from: "user", content: " phone number" },
  {
    from: "bot",
    content: <>Phone number 87056146518</>,
  },
];
const Bubble = ({
  children,
  from,
}: {
  children: ReactNode;
  from: "bot" | "user";
}) => {
  const base = "relative px-4 pt-2 pb-5 text-sm max-w-xs";
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
    <div className="chat-container max-w-xs mx-auto space-y-3">
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
