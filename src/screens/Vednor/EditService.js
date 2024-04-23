import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { db, auth } from "../../../firebase/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { TouchableOpacity } from "react-native";
const EditService = ({ route, navigation }) => {
  const [price, setPrice] = useState(route.params.price);
  const [status, setStatus] = useState(route.params.status);
  const updateService = async (_status) => {
    const ref = doc(db, "User", auth.currentUser.uid);
    const ref2 = doc(ref, "Services", route.params.sId);
    await updateDoc(ref2, {
      price: price,
      status: _status,
    }).then(() => {
      updateSecoundService(_status);
      alert("Updated Successfully ");

      navigation.navigate("ViewServices");
    });
  };
  const updateSecoundService = async (_status) => {
    const ref = doc(db, "category", route.params.sId);
    const ref2 = doc(ref, "vendors", auth.currentUser.uid);
    await updateDoc(ref2, {
      price: price,
      status: _status,
    });
  };

  return (
    <View>
      <TextInput
        label="Price/Hour"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      <View
        style={{
          margin: 10,
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green",
            height: 45,
            width: "50%",
          }}
          onPress={() => updateService(status)}
        >
          <Text>Update</Text>
        </TouchableOpacity>
        {status === true && (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              height: 45,
              width: "50%",
            }}
            onPress={() => updateService(false)}
          >
            <Text>Deactivate</Text>
          </TouchableOpacity>
        )}
        {status === false && (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "blue",
              height: 45,
              width: "50%",
            }}
            onPress={() => updateService(true)}
          >
            <Text>Activate</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EditService;

const styles = StyleSheet.create({});
