import { Drawer } from "expo-router/drawer";
export default function DrawerLayout() {
  //   function CustomDrawerContent(props: any) {
  //     return (
  //       <DrawerContentScrollView {...props}>
  //         <View
  //           style={{
  //             padding: 16,
  //             flexDirection: "row",
  //             alignItems: "center",
  //             gap: 12,
  //           }}
  //         >
  //           <Image
  //             source={{ uri: "https://picsum.photos/seed/1/60" }}
  //             style={{ width: 48, height: 48, borderRadius: 24 }}
  //           />
  //           <Text style={{ fontWeight: "bold" }}>Jane Doe</Text>
  //         </View>
  //         <DrawerItemList {...props} />
  //       </DrawerContentScrollView>
  //     );
  //   }
  return (
    // <Drawer
    //   drawerContent={(props) => (
    //     <CustomDrawerContent {...props} headerShown={false} />
    //   )}
    //   >
    <Drawer
      screenOptions={{
        drawerActiveBackgroundColor: "red",
        drawerActiveTintColor: "white",
        drawerPosition: "left",
        drawerType: "slide",
      }}
    >
      <Drawer.Screen
        name="(tab)"
        options={{ drawerLabel: "Home", title: "Home" }}
      />
      <Drawer.Screen name="innkeeper" options={{ drawerLabel: "Innkeeper" }} />
      <Drawer.Screen name="settings" options={{ drawerLabel: "Settings" }} />
      <Drawer.Screen name="about" options={{ drawerLabel: "About" }} />
      <Drawer.Screen name="visit" options={{ drawerLabel: "Visit" }} />
    </Drawer>
  );
}
