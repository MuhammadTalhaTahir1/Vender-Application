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
import VendorData from "../../components/VendorData";
const Orders = ({ navigation }) => {
  const [data, setData] = useState([]);
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "fiver",
  //     headerTintColor: "#0ff",
  //     headerTitleAlign: "center",
  //   });
  // }, [navigation]);
  useLayoutEffect(() => {
    const ref = collection(db, "order");
    const q = query(ref, where("userId", "==", auth.currentUser.uid));
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CustomerSingleOrder", {
                id: item.id,
                sId: item.data.serviceId,
                price: item.data.total_price,
                hours: item.data.hours,
                status: item.data.status,
                vId:item.data.venderId,
              })
            }
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
              {/* <Service id={item.data.serviceId} /> */}
              <VendorData
                id={item.data.venderId}
                price={item.data.total_price}
                hours={item.data.hours}
                serviceId={item.data.serviceId}
                req="personal"
              />
            </View>

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
      {/* <View
        style={{
          height: "9%",
        }}
      >
        <View
          style={{
            justifyContent: "space-evenly",
            borderTopWidth: 1,
            borderColor: "white",
            paddingTop: 5,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="home-outline" size={30} color="black" />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="notifications-circle-outline"
              size={30}
              color="black"
            />
            <Text>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Orders")}
          >
            <Ionicons name="folder-outline" size={30} color="black" />
            <Text>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="chatbubbles-outline" size={30} color="black" />
            <Text>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="ellipse-outline" size={30} color="black" />
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({});
