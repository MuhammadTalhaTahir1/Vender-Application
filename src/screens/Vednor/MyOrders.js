import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "../../../firebase/FirebaseConfig";
import { ScrollView } from "react-native";
import Service from "../../components/Service";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
const MyOrders = ({ navigation }) => {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    const ref = collection(db, "order");
    const q = query(ref, where("venderId", "==", auth.currentUser.uid));
    onSnapshot(q, (categories) =>
      setData(
        categories.docs.map((category) => ({
          id: category.id,
          data: category.data(),
        }))
      )
    );
  }, []);
  return (
    <SafeAreaView
      style={{
        height: "100%",
      }}
    >
      <ScrollView
        style={{
          height: "91%",
        }}
      >
        {data.map((item, key) => (
          <TouchableOpacity onPress={()=>navigation.navigate("SingleOrder",{
            id:item.id,
            sId:item.data.serviceId,
            price:item.data.total_price,
            hours:item.data.hours,
            status:item.data.status
          })}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              margin: 10,
              padding: 4,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            
            
            <View>
              <View
                style={{
                  // flexDirection:'row',
                  // justifyContent:'space-between',
                  alignItems: "center",
                }}
              ></View>
              <Service id={item.data.serviceId} req="personal" />
            </View>
            <View>
              <Text>
                Hours:{item.data.hours}
              </Text>
              <Text>
                Bill:{item.data.total_price}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "red",
                  fontSize: 15,
                }}
              >
                {item.data.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({});
