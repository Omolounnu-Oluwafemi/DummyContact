import { useCameraPermissions } from "expo-camera";
import { useEffect } from "react";
import { Text } from "react-native";

export default function ProfilePage() {
  const [permission, requestPermission] = useCameraPermissions();
  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);
  if (!permission) {
    return <Text>Checking permission...</Text>; // still loading
  }
  if (!permission.granted) {
    return <Text>Camera access is required to use this feature.</Text>;
  }
  return <Text>Camera ready!</Text>;
}
// export default function profilePage() {
//   return (
//     <SafeAreaView>
//       <Text>This is profile page</Text>
//       <Button
//         onPress={() => router.push("/innkeeper")}
//         title="Go to Innkeeper"
//       />

//       {/* <CameraScreen /> */}
//     </SafeAreaView>
//   );
// }
