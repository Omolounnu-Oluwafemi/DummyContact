import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfilePage() {
  const [permission, requestPermission] = useCameraPermissions();

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return;
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!result.canceled) {
      console.log(result.assets[0].uri); // local file path
    }
  }
  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission) {
    return <Text>Checking permission...</Text>; // still loading
  }
  // if (!permission.granted && !permission.canAskAgain) {
  //   return (
  //     <View>
  //       <Text>Camera access was denied. Enable it in Settings.</Text>
  //       <Pressable onPress={() => Linking.openSettings()}>
  //         <Text>Open Settings</Text>
  //       </Pressable>
  //     </View>
  //   );
  // }

  if (!permission.granted) {
    return (
      <View>
        <Text>
          Camera ready!
          <TouchableOpacity onPress={takePhoto}>
            <Text>Take Photo</Text>
          </TouchableOpacity>
        </Text>
      </View>
    );
  }
  return (
    <View>
      <Text>
        Camera ready!
        <TouchableOpacity onPress={takePhoto}>
          <Text>Take Photo</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
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
