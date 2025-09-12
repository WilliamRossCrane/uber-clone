import { Tabs } from "expo-router";
import { View, Image, ImageSourcePropType } from "react-native";
import { icons } from "@/app/constants";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: focused ? "#3B82F6" : "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={source}
          resizeMode="contain"
          style={{ width: 28, height: 28, tintColor: "white" }}
        />
      </View>
    </View>
  );
};

const Layout = () => (
  <Tabs
    initialRouteName="home"
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "white",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#333333",
        borderRadius: 40,
        marginHorizontal: 20,
        marginBottom: 30,
        height: 73,
        position: "absolute",
      },
      tabBarItemStyle: {
        marginTop: 10,
      },
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={{ top: 4 }}>
            <TabIcon source={icons.home} focused={focused} />
          </View>
        ),
      }}
    />
    <Tabs.Screen
      name="rides"
      options={{
        title: "Ride",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={{ top: 4 }}>
            <TabIcon source={icons.list} focused={focused} />
          </View>
        ),
      }}
    />
    <Tabs.Screen
      name="chat"
      options={{
        title: "Chat",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={{ top: 4 }}>
            <TabIcon source={icons.chat} focused={focused} />
          </View>
        ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={{ top: 4 }}>
            <TabIcon source={icons.profile} focused={focused} />
          </View>
        ),
      }}
    />
  </Tabs>
);

export default Layout;
