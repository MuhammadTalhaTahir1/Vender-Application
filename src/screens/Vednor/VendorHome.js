import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Services from "../../components/Services";
import MapView from "react-native-maps";
import { signOut } from "firebase/auth";
import { Marker } from "react-native-maps";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../../firebase/FirebaseConfig";

import { ScrollView } from "react-native";
import BottomBar from "../../components/BottomBar";
const VendorHome = ({ navigation }) => {
  const [name, setName] = useState("null");
  const [picture, setPicture] = useState("null");
  useLayoutEffect(() => {
    const readData = async () => {
      const docRef = doc(db, "User", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setName(docSnap.data().name);

        setPicture(docSnap.data().picture);
      }
    };
    readData();
  }, [navigation, name, picture]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            margin: 10,
          }}
          onPress={() => logout()}
        >
          <View>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXjz4OvxiE6w9Bdg82-p7Jn6MxZd236jndbw&usqp=CAU",
              }}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </View>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            margin: 10,
            marginRight: 50,
          }}
          onPress={() => navigation.navigate("VenderProfile")}
        >
          <View>
            {picture === "null" && (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: "https://www.pngmart.com/files/21/Admin-Profile-PNG-Isolated-Pic.png",
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 30,
                  }}
                />
                <Text>{name}</Text>
              </View>
            )}
            {picture !== "null" && (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: picture,
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 30,
                  }}
                />
                <Text>{name}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, picture, name]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("LoginScreen");
        alert("Logout Successfully");
      })
      .catch((error) => {
        alert(error.Message);
      });
  };
  return (
    
    <View
    style={{
      height:'100%'
    }}
    >
<ScrollView
style={{
      // height:'91%'
    }}
    showsVerticalScrollIndicator={false}
    
    >
   
      {/* <View
        style={{
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            height: 45,
            width: "70%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
          }}
          onPress={() => navigation.navigate("MyOrders")}
        >
          <Text>My Orders</Text>
        </TouchableOpacity>
      </View> */}
      <View>
        <Services type="Vendor" />
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          alignItems: "center",
          marginTop: 10,
          marginRight: 15,
          marginLeft: 15,
          width: "100%",
        }}
      >
        <Text
          style={{
            color: "red",
          }}
        >
          Note!
        </Text>

        <Text
          style={{
            marginLeft: 5,
            color: "blue",
          }}
        >
          Please upload profile before going to join any
        </Text>
      </View>
      <View
        style={{
          marginLeft: 15,
          backgroundColor: "white",
          marginRight: 15,
        }}
      >
        <Text
          style={{
            color: "blue",
          }}
        >
          Services
        </Text>
      </View>
      <View style={styles.container}>
        <MapView
          //  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 32.580887410403896,
            longitude: 74.09937838220885,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            // key={index}
            coordinate={{
              latitude: 32.580887410403896,
              longitude: 74.09937838220885,
            }}
            title="Maira Ghar"
            description="Destination"
          />
        </MapView>
      </View>
      
      
    </ScrollView>
    <View
    style={{
      height:'9%'
    }}
    >
      <BottomBar  type="vendor"/>
    </View>
    </View>


  );
};
export default VendorHome;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 300,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
