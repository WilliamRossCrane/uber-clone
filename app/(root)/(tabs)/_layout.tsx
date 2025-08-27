import { Tabs } from "expo-router";
import { View, Image, ImageSourcePropType } from "react-native";

import { icons } from "@/app/constants";

const TabIcon = ({ source, focused }: { source: ImageSourcePropType; focused: boolean }) => (
  <View className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}>
    <View className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}>
      <Image
        source={source}
        resizeMode="contain"
        style={{ tintColor: "white" }}
        className="w-7 h-7"
      />
    </View>
  </View>
);

const Layout = () => (
  <Tabs
    initialRouteName="index"
    screenOptions={{
      tabBarActiveTintColor: "white", 
      tabBarInactiveTintColor: "white",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#333333",
        borderRadius: 50,
        paddingBottom: 0, // iOS only
        overflow: "hidden",
        marginHorizontal: 20,
        marginBottom: 20,
        height: 78,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute",
      },
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon source={icons.home} focused={focused} />,
      }}
    />
    <Tabs.Screen
      name="rides"
      options={{
        title: "Ride",
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon source={icons.list} focused={focused} />,
      }}
    />
    <Tabs.Screen
      name="chat"
      options={{
        title: "Chat",
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon source={icons.chat} focused={focused} />,
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon source={icons.profile} focused={focused} />,
      }}
    />
  </Tabs>
);

export default Layout;
