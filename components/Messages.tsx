import React, { useRef, useEffect } from "react";
import { FlatList } from "react-native";
import Message, { MessageProps } from "./Message";
import RoomButton, { RoomButtonProps } from "./RoomButton";

interface MessagesProps {
  messages: (MessageProps | RoomButtonProps)[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // scroll to the bottom when messages change
    flatListRef.current?.scrollToEnd();
  }, [messages]);

  const renderItem = ({ item }: { item: MessageProps | RoomButtonProps }) => {
    if ("messageid" in item) {
      return (
        <Message
          messageid={item.messageid}
          message={item.message}
          sender={item.sender}
          timestamp={item.timestamp}
        />
      );
    } else {
      return (
        <RoomButton
          roomnumber={item.roomnumber}
          name={item.name}
          type={item.type}
          capacity={item.capacity}
        />
      );
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={{ flex: 1 }}
      onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      onLayout={() => flatListRef.current?.scrollToEnd()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Messages;
