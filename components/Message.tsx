import { Image, View, Text } from "react-native";

export interface MessageProps {
  message: string;
  sender: string;
  timestamp: number;
  profilePic: string;
}

export default function Message({
  message,
  sender,
  timestamp,
  profilePic,
}: MessageProps) {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    console.log(diff);
    if (diff < 1000 * 60) {
      return "Just now";
    } else if (diff < 1000 * 60 * 60) {
      return `${Math.floor(diff / 1000 / 60)}m ago`;
    } else if (diff < 1000 * 60 * 60 * 24) {
      return `${Math.floor(diff / 1000 / 60 / 60)}h ago`;
    } else if (diff < 1000 * 60 * 60 * 24 * 7) {
      return `${Math.floor(diff / 1000 / 60 / 60 / 24)}d ago`;
    } else {
      return `${Math.floor(diff / 1000 / 60 / 60 / 24 / 7)}w ago`;
    }
  };

  return (
    <View className="flex flex-row pb-5">
      <Image
        className="rounded-full mx-[15px]"
        source={{
          uri: profilePic,
        }}
        style={{ resizeMode: "cover", width: 45, height: 45 }}
      />
      <View className="flex flex-col">
        <View className="flex flex-row gap-x-[15px]">
          <Text className="text-offwhite">{sender}</Text>
          <Text className="text-secondary">{formatTimestamp(timestamp)}</Text>
        </View>
        <Text className="text-offwhite">{message}</Text>
      </View>
    </View>
  );
}
