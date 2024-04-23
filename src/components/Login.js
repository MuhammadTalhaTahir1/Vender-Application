import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { TextInput } from "react-native-paper";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [type, setType] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const readData = async () => {
        const docRef = doc(db, "User", auth.currentUser.uid);
        const user = await getDoc(docRef);

        if (user.exists()) {
          setType(user.data().type);
        }
      }
        if (user) {
          readData();
        }
    });
  }, [type]);

  useLayoutEffect(() => {
    if (type == "Customer") {
      navigation.replace("Home");
    }
    if (type == "Admin") {
      navigation.replace("Admindashboard");
    }
    if (type == "Vendor") {
      navigation.replace("VendorHome");
    }
  }, [type, navigation]);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setType(true);
      })
      .catch((error) => {
        alert("Please enter valid email and password!!");
      });
  };

  return (
    <View style={{ height: "100%" }}>
      <View>
        <TextInput
          style={{
            marginBottom: 30,

            marginHorizontal: 10,
            backgroundColor: "#D3D3D3",
          }}
          activeUnderlineColor="black"
          mode="outlined"
          label={"Enter Email"}
          onChangeText={(text) => setEmail(text)}
        />
    
        <TextInput
          style={{
            marginBottom: 30,

            marginHorizontal: 10,
            backgroundColor: "#D3D3D3",
          }}
          label={"Enter Password"}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          activeUnderlineColor="black"
          mode="outlined"
        />
        
      </View>
      <View
        style={{
          // flexDirection: "row",

          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#f0e76e",

            height: 40,
            width: 200,
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
          }}
          onPress={() => login()}
        >
          <Text
            style={{
              justifyContent: "center",
              fontSize: 15,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
