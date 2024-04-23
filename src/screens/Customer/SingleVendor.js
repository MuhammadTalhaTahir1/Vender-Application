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

const SingleVendor = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [hours1, setHours1] = useState(0);
  const [status, setStatus] = useState("Pending");
  const [hours, setHours] = useState(0);
  const [total, setTotal] = useState(0);
  const [state, setState] = useState(true);
  const [exist, setExist] = useState(false);
  const [totalHours, setTotalHours] = useState(false);
  const [id, setId] = useState(null);
  const [id1, setId1] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [check, setCheck] = useState(true);

  const [chatId, setChadID] = useState(null);
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "fiver",
  //     headerTintColor: "#0ff",
  //     headerTitleAlign: "center",
  //   });
  // }, [navigation]);

  useEffect(() => {
    const readService = async () => {
      const ref = doc(db, "User", route.params.vendorId);

      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setPicture(docSnap.data().picture);
        setName(docSnap.data().name);
        setPrice(route.params.price);
      }
    };

    const readExistingOrder = async () => {
      const ref = collection(db, "order");
      const q = query(ref, where("userId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (
          doc.data().venderId == route.params.vendorId &&
          doc.data().status == "Pending" &&
          doc.data().serviceId == route.params.serviceId
        ) {
          setExist(true);
          setHours1(doc.data().hours);
          setId(doc.id);
          // alert("true");
          return;
        }

        console.log(doc.id, " => ", doc.data());
      });
    };

    readService();
    readExistingOrder();
  }, []);
  useEffect(() => {
    setTotalHours(hours + hours1);
    setTotal(totalHours * price);
  }, [hours, hours1, totalHours]);
  const placeOrder = async () => {
    // alert(exist);
    if (exist === true) {
      update();
    } else {
      alert(hours);

      const read = async () => {
        const doc1 = await addDoc(collection(db, "order"), {
          userId: auth.currentUser.uid,
          venderId: route.params.vendorId,
          serviceId: route.params.serviceId,
          hours: totalHours,
          total_price: total,
          status: status,
        });
      };
      read();
    }

    setState(false);
  };
  const createChat = async () => {
    if (check === false) {
      navigation.navigate("ChatScreen", {
        id: chatId,
        picture:picture,
      type:"Customer",
      });
    }
    if (check === true) {
      const read = async () => {
        const docRef = await addDoc(collection(db, "chats"), {
          customerId: auth.currentUser.uid,
          vendorId: route.params.vendorId,
        });
        console.log("Document written with ID: ", docRef.id);
        navigation.navigate("ChatScreen", {
          id: docRef.id,
          picture:picture,
          type:"Customer",
        });
      };
      read();
    }
  };

  useLayoutEffect(() => {
    const Chatts = async () => {
      const docRef = collection(db, "chats");
      //  const q = query(docRef, where("customerId","==",route.params.serviceId), where("vendorId", "==", route.params.vendorId,));
      const q = query(docRef, where("customerId", "==", auth.currentUser.uid));
      const q1 = query(q, where("vendorId", "==", route.params.vendorId));

      const docSnap = await getDocs(q1);

      docSnap.forEach((doc) => {
        setCheck(false);
        setChadID(doc.id);
      });

      // if (docSnap !== null) {
      //   setCheck(false);
      //   setChadID(docSnap.id);
      // } else {
      //   setCheck(true);
      //   setChadID(docSnap.id);
      // }
    };
    Chatts();
  }, []);

  const update = async () => {
    const washingtonRef = doc(db, "order", id);
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      total_price: total,
      hours: totalHours,
    });
  };
  // useLayoutEffect(() => {

  // })
  return (
    <View>
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
          {name}
        </Text>
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
        <Text
          style={{
            padding: 10,
          }}
        >
          {status}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <NumericInput type="up-down" onChange={(text) => setHours(text)} />
        <Text>{total}</Text>

        <TouchableOpacity
          style={{
            height: 50,
            width: "40%",
            backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginRight: 5,
          }}
          onPress={() => placeOrder()}
        >
          {state === true && (
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              Order Now
            </Text>
          )}
          {state === false && <Text>Pending..</Text>}
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={{
            height: 50,
            width: "90%",
            backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            // marginRight: 5,
            marginLeft: "5%",
            marginTop: 15,
          }}
          onPress={() => createChat()}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Chat Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleVendor;

const styles = StyleSheet.create({});

// order collection (userId Id, vendor Id, Service Id, hourse, total price, status)
