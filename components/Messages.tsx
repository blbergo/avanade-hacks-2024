import Message, { MessageProps } from "./Message";
import { View } from "react-native";

interface MessagesProps {
  messages: MessageProps[];
}
export default function Messages({ messages }: MessagesProps) {
  return (
    <View className="flex flex-col">
      {messages.map((item) => {
        return (
          <Message
            message={item.message}
            sender={item.sender}
            timestamp={item.timestamp}
            profilePic={item.profilePic}
          />
        );
      })}
    </View>
  );
}
