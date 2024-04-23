import { StyleSheet, Text, View,Image,TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  docs,
  where,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase/FirebaseConfig";
const ViewVenderCategory = ({ navigation, route }) => {
 
  const [data, setData] = useState([]);
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "fiver",
  //     headerTintColor: "#0ff",
  //     headerTitleAlign: "center",
  //   });
  // }, [navigation]);
  useLayoutEffect(() => {
    const ref = doc(db, "User", route.params.id);
    const ref1 = collection(ref, "Services");
    onSnapshot(ref1, (categories) =>
      setData(
        categories.docs.map((category) => ({
          id: category.id,
          data: category.data(),
        }))
      )
    );
  }, []);
  return (
    <View>
      {data.map((item, key) => (
        <View
          key={key}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            marginHorizontal: 5,
            borderRadius: 10,
            padding: 5,
          }}
        >
          <Image
            source={{
              uri: item.data.CategoryPicture,
            }}
            style={{
              width: 120,
              height: 120,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          <Text
            style={{
              fontSize: 15,
              marginTop: 5,
              fontWeight: "bold",
            }}
          >
            {item.data.service}
          </Text>

          <TouchableOpacity
            style={{
              width: "100%",
              height: 30,
              backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              margin: 5,
            }}
            onPress={()=>navigation.navigate("SingleVendor",{
              serviceId:item.id,
              vendorId:route.params.id,
              price:item.data.price,
            })}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              View
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ViewVenderCategory;

const styles = StyleSheet.create({});
