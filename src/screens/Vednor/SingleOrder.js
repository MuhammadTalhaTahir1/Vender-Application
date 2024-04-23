import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  docs,
  addDoc,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase/FirebaseConfig";
import { Image } from "react-native";
import NumericInput from "react-native-numeric-input";
import { async } from "@firebase/util";
import { setUserId } from "firebase/analytics";
import { useLayoutEffect } from "react";

const SingleOrder = ({ navigation, route }) => {
  const [hours, setHours] = useState(route.params.hours);
  const [price, setPrice] = useState(route.params.price);
  const [serviceId, setServiceId] = useState(route.params.sId);
  const [status, setStatus] = useState(route.params.status);
  const [id, setId] = useState(route.params.id);
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const readService = async () => {
      const ref = doc(db, "category", serviceId);

      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setPicture(docSnap.data().picture);
        setTitle(docSnap.data().title);
      }
    };
    readService();
  }, [picture, title]);

  const order = async (status) => {
    const washingtonRef = doc(db, "order", id);
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      status: status,
    });
    alert("Order has been " + status);
    setStatus(status);
  };

  return (
    <View style={{
      alignItems:'center'
    }}>
      <Image
        source={{
          uri: picture,
        }}
        style={{
          width: "100%",
          height: 250,
        }}
      />

      <View
        style={{
          podding: 30,
          marginHorizontal: 10,
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            padding: 10,
          }}
        >
          Hours:{hours}
        </Text>
        <Text>{title}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "red",
              fontSize: 30,
            }}
          >
            {price + " "}
          </Text>
          <Text>/-Rs</Text>
        </View>
      </View>
      {status === "Pending" && (
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => order("Accept")}
            style={{
              backgroundColor: "red",
              height: 45,
              width: "40%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
            }}
          >
            <Text>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => order("Reject")}
            style={{
              backgroundColor: "red",
              height: 45,
              width: "40%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
            }}
          >
            <Text>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
      {status === "Accept" && (
        <TouchableOpacity
            onPress={() => order("Requested")}
            style={{
              backgroundColor: "red",
              height: 45,
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
            }}
          >
            <Text>Proceed Now</Text>
          </TouchableOpacity>
      )}
      {status === "Requested" && (
        <Text>
          Please Wait for customer approval
        </Text>
      )}
      {status === "Completed" && (
        <Text>
            You Complete this service
        </Text>
      )}
      {status === "Running" && (
        <TouchableOpacity
            onPress={() => order("End Request")}
            style={{
              backgroundColor: "red",
              height: 45,
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
            }}
          >
            <Text>End Now</Text>
          </TouchableOpacity>
      )}
    </View>
  );
};

export default SingleOrder;

const styles = StyleSheet.create({});

// order collection (userId Id, vendor Id, Service Id, hourse, total price, status)
