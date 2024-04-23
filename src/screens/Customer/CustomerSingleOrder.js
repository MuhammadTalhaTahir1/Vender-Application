import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native";

const CustomerSingleOrder = ({ navigation, route }) => {
  const [hours, setHours] = useState(route.params.hours);
  const [price, setPrice] = useState(route.params.price);
  const [serviceId, setServiceId] = useState(route.params.sId);
  const [status, setStatus] = useState(route.params.status);
  const [id, setId] = useState(route.params.id);
  const [vId, setVId] = useState(route.params.vId);

  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "fiver",
  //     headerTintColor: "#0ff",
  //     headerTitleAlign: "center",
  //   });
  // }, [navigation]);
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
  const feedbeek = async () => {
    const docRef = await addDoc(collection(db, "Order_Feedback"), {
      sId: serviceId,
      vId: vId,
      C_id: auth.currentUser.uid,
      feeback: feedback,
    });
    alert("your feedback is successfully send");
    setFeedback(null);
  };

  return (
    <KeyboardAwareScrollView
      style={{
        height: "100%",
      }}
    >
      <ScrollView>
        <View
          style={
            {
              // alignItems: "center",
            }
          }
        >
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
              marginHorizontal: 2,
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
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                padding: 10,
              }}
            >
              {title}
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
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          {status === "Pending" && (
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <Text>Waiting for Response From your respective Vendor</Text>
              {/* <TouchableOpacity
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
          </TouchableOpacity> */}
            </View>
          )}
          {status === "Requested" && (
            <TouchableOpacity
              onPress={() => order("Running")}
              style={{
                backgroundColor: "red",
                height: 45,
                width: "90%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                margin: 10,
              }}
            >
              <Text>Confirm Now</Text>
            </TouchableOpacity>
          )}
          {status === "Running" && (
            <Text
              style={{
                margin: 10,
              }}
            >
              Your service is running now
            </Text>
          )}
          {status === "Completed" && (
            <Text
              style={{
                margin: 10,
              }}
            >
              Your service is End now
            </Text>
          )}
          {status === "End Request" && (
            <TouchableOpacity
              onPress={() => order("Completed")}
              style={{
                backgroundColor: "red",
                height: 45,
                width: "90%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                margin: 10,
              }}
            >
              <Text>Complete Now</Text>
            </TouchableOpacity>
          )}

          <View 
            style={{
              alignItems: "flex-start",
              
            }}
          >
            <Text>Feedback</Text>
          </View>
          <View
            style={{
              width: "70%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                borderWidth: 1,
                padding: 5,
                height: 150,
                width: "100%",
              }}
            >
              <TextInput
                style={{ justifyContent: "flex-start" }}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                // numberOfLines={10}
                multiline={true}
                onChangeText={(text) => setFeedback(text)}
                value={feedback}
              />
            </View>
            <View
              style={{
                marginLeft: 15,
                padding: 5,
              }}
            >
              <TouchableOpacity onPress={() => feedbeek()}>
                <Image
                  source={{
                    uri: "https://www.pngfind.com/pngs/m/74-749231_png-file-svg-send-message-icon-png-transparent.png",
                  }}
                  style={{
                    height: 40,
                    width: 40,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default CustomerSingleOrder;

const styles = StyleSheet.create({});

// order collection (userId Id, vendor Id, Service Id, hourse, total price, status)
