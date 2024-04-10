import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: "#434343",
            height: 120,
          },
          headerTintColor: "#ffffff",
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Chat",
            title: "26Live",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
