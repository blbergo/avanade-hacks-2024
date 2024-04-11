import { Image, View, Text, SafeAreaView } from "react-native";

export interface MessageProps {
  messageid: number;
  message: string;
  sender: string;
  timestamp: number;
}

export default function Message({ message, sender, timestamp }: MessageProps) {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
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
    <View className="flex flex-row w-full mt-5">
      {/*
      <Image
        className="rounded-full mx-[15px]"
        source={{
          uri: profilePic,
        }}
        style={{ resizeMode: "cover", width: 45, height: 45 }}
      />*/}

      <View
        className={`${sender == "Venue Bot" ? "bg-accent" : "bg-offwhite"} rounded-full h-[45px] w-[45px] mr-[15px]`}
      />

      <View className="flex flex-col flex-1">
        <View className="flex flex-row gap-x-[15px] items-end">
          <Text className="text-offwhite text-lg font-medium">{sender}</Text>
          <Text className="text-secondary text-base font-regular mb-[2px]">
            {formatTimestamp(timestamp)}
          </Text>
        </View>
        <Text className="text-offwhite text-lg font-regular text-balance">
          {message}
        </Text>
      </View>
    </View>
  );
}
