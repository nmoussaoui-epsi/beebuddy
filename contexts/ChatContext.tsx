import React, { createContext, useContext, useState } from "react";

interface ChatContextType {
  isInChat: boolean;
  setIsInChat: (isInChat: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isInChat, setIsInChat] = useState(false);

  return (
    <ChatContext.Provider value={{ isInChat, setIsInChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
