import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { db, auth } from "../../firebase/FirebaseConfig";
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
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { async } from "@firebase/util";

const Services = (props) => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [picture, setPicture] = useState(
    "https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg"
  );
  const [picture1, setPicture1] = useState();
  // const [join, setJoin] = useState("null");
  const navigation = useNavigation();
  //Read All Data
  useLayoutEffect(() => {
    const ref = collection(db, "category");
    onSnapshot(ref, (categories) =>
      setData(
        categories.docs.map((category) => ({
          id: category.id,
          data: category.data(),
        }))
      )
    );
  }, []);
  // for picture
  useLayoutEffect(() => {
    const ReadData = async () => {
      const docRef = doc(db, "User", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPicture(docSnap.data().picture);
      }
    };

    ReadData();
  }, []);

  const AddServiceVendor = async (id,title,C_picture) => {
    // Add a new document in collection "cities"
    const ref = doc(db, "category", id);
    await setDoc(doc(ref, "vendors", auth.currentUser.uid), {
      status: "Active",
      join: "joined",
      VendorPicture: picture,
      CategoryPicture:C_picture,
      service: title,
    }).then(() => {
      alert("Added");
    });
  };
  //Add Services
  // vender for join
  const addService = async (id, title,C_picture) => {
    {
      const ref = doc(db, "User", auth.currentUser.uid);
      await setDoc(doc(ref, "Services", id), {
        service: title,
        price: 0,
        status: true,
        join: "joined",
        VendorPicture: picture,
        CategoryPicture:C_picture,
      }).then(() => {
        alert("Added successfully");
        AddServiceVendor(id,title,C_picture);
      });
    }
  };

  const DeleteService = async (id) => {
    alert("ok");
    await deleteDoc(doc(db, "category", id)).then(() => {
      alert("Deleted successfully");
    });
  };
  //Edit Category
  const EditCategory = (id) => {
    navigation.navigate("AddCategory", {
      id: id,
      type: "Edit",
    });
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#eee",
      }}
    >
      <Text
        style={{
          margin: 10,
          marginLeft:15,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Our Services
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.type === "Admin" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("AddCategory", { type: "Add" })}
          >
            <Image
              source={{
                uri: "https://www.iconpacks.net/icons/1/free-plus-icon-321-thumb.png",
              }}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </TouchableOpacity>
        )}
        {props.type === "Vendor" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewServices")}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{
                uri: "https://www.kindpng.com/picc/m/750-7505601_services-icon-png-services-icon-transparent-png.png",
              }}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              My Services
            </Text>
          </TouchableOpacity>
        )}

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
                uri: item.data.picture,

              }}
              style={{
                width: 120,
                height: 120,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            
            {/* delete button */}
            {props.type === "Admin" && (
              <TouchableOpacity onPress={() => DeleteService(item.id)}>
                <Image
                  source={{
                    uri: "https://cdn1.iconfinder.com/data/icons/sharovar-outline/128/Delete-512.png",
                  }}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    position: "absolute",
                    top: -110,
                    right: -50,
                    zIndex: 40, // works on ios
                    elevation: 40, // works on android
                  }}
                />
              </TouchableOpacity>
            )}

            <Text
              style={{
                fontSize: 15,
                marginTop: 5,
                fontWeight: "bold",
              }}
            >
              {item.data.title}
            </Text>
            {props.type === "Admin" && (
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
                onPress={() => EditCategory(item.id)}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            )}
            {props.type === "customer" && (
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
                onPress={() =>
                  navigation.navigate("ViewVenderServices", { id: item.id })
                }
              >
              
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  View
                </Text>
              </TouchableOpacity>
            )}
            {props.type === "Vendor" && (
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 45,
                  backgroundColor: "green",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  margin: 10,
                }}
                onPress={() => addService(item.id, item.data.title,item.data.picture)}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Join
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Services;

const styles = StyleSheet.create({});
