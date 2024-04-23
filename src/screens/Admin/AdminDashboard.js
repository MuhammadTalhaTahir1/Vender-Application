import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,Image
} from "react-native";
import React, { useLayoutEffect } from "react";
import { TextInput } from "react-native-paper";
import { signOut } from "firebase/auth";
import { db,auth } from "../../../firebase/FirebaseConfig";
import Services from "../../components/Services";
const AdminDashboard = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            margin: 10,
          }}
          onPress={() => logout()}
        >
          <View>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXjz4OvxiE6w9Bdg82-p7Jn6MxZd236jndbw&usqp=CAU",
              }}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </View>
        </TouchableOpacity>
      ),
     
    });
  }, [navigation]);

  const logout = () => {
    signOut(auth).then(() => {

      navigation.replace("LoginScreen");
      alert("Logout Successfully")
    })
      .catch((error) => {
        alert(error.Message);
      });
    
  };
  return (
    <SafeAreaView
      style={{
        height: "100%",
      }}
    >
      <Services type="Admin" />
    </SafeAreaView>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({});
