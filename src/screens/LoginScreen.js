import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import Login from "../components/Login";
import Register from "../components/Register";

const LoginScreen = ({ navigation }) => {
  const [data, setData] = useState(true);
   return (
    <SafeAreaView style={{ height: "100%" }}>
      {/* photo */}
      <View
        style={{
          height: "30%",
          alignItems: "center",
          margin: 5,
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <Image
          source={{
            uri: "https://p.kindpng.com/picc/s/235-2350682_new-svg-image-small-user-login-icon-hd.png",
          }}
          style={{
            height: 200,
            width: 200,
            resizeMode: "stretch",
          }}
        />
      </View>
      {/* component */}
      <View
        style={{
          height: "70%",
          marginTop: 16,
          width: "100%",
          backgroundColor: "#FFFEFA",

         
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}
      >
        {/* Login */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            margin: 5,
            marginTop: 30,
            marginBottom: 30,
            height: "10%",
          }}
        >
          <TouchableOpacity onPress={() => setData(true)}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setData(false)}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {data === true && (
          <View style={{ height: "90%" }}>
            <Login />
          </View>
        )}
        {data === false && (
          <View style={{ height: "90%" }}>
            <Register/>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
