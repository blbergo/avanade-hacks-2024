import React, { useRef, useEffect } from "react";
import { FlatList } from "react-native";
import Message, { MessageProps } from "./Message";

interface MessagesProps {
  messages: MessageProps[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // scroll to the bottom when messages change
    flatListRef.current?.scrollToEnd();
  }, [messages]);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={({ item }) => (
        <Message
          messageid={item.messageid}
          message={item.message}
          sender={item.sender}
          timestamp={item.timestamp}
          profilePic={item.profilePic}
        />
      )}
      keyExtractor={(item) => item.messageid.toString()}
      style={{ flex: 1 }}
      onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      onLayout={() => flatListRef.current?.scrollToEnd()}
    />
  );
};

export default Messages;
