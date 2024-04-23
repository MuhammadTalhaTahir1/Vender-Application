import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  docs,
  where,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../../firebase/FirebaseConfig";
import { ScrollView } from "react-native";
import VendorData from "../../components/VendorData";
const ViewVenderServices = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  useLayoutEffect(() => {
    const ref = doc(db, "category", route.params.id);
    const ref1 = collection(ref, "vendors");
    onSnapshot(ref1, (categories) =>
      setData(
        categories.docs.map((category) => ({
          id: category.id,
          data: category.data(),
        }))
      )
    );
  }, []);
  // useLayoutEffect(() => {
  //   navigation.setOptions({
     
  //     title: "fiver",
  //     headerTintColor: "#0ff",
  //     headerTitleAlign: "center",
  //   });
  // }, [navigation]);

  return (
    <View>
      <ScrollView>
        {data.map((item, key) => (
          <View key={key}>
            <VendorData
              id={item.id}
              price={item.data.price}
              serviceId={route.params.id}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewVenderServices;
const styles = StyleSheet.create({});
