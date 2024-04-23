import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
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
} from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { Title } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const VendorData = (props) => {
  const [picture, setPicture] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const navigation=useNavigation();
  useEffect(() => {
    const readService = async () => {
      const ref = doc(db, "User", props.id);

      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setPicture(docSnap.data().picture);
        setName(docSnap.data().name);
      }
    };
    readService();
  }, [props.id]);

  useEffect(() => {
    const readData = async () => {
      const ref = doc(db, "category", props.serviceId);
      const ref1 = doc(ref, "vendors", props.id);
      const docSnap = await getDoc(ref1);
      if (docSnap.exists()) {
        setPrice(docSnap.data().price);
        
      }
    };
    readData();
  }, [props.id,props.serviceId]);
  return (
    <SafeAreaView style={{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        padding:10,
        backgroundColor:'white',
        marginBottom:8,
        
    }}>
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
            width: 60,
            height: 60,
            borderRadius: 40,
          }}
        />
        <Title>{name}</Title>
      </View>
      <View
      style={{
        flexDirection:'column',
        marginHorizontal:8,
      }}
      >
      <Text style={{
        fontSize:15,
        marginLeft:5,
        fontWeight:'bold',
      }}>
        {props.price}-Rs
      </Text>
      {props.req==="personal" &&(
        <Text
        
        >
          {props.hours}/hrs
        </Text>
      )

      }
      </View>
      {props.req!=='personal' && (
        <TouchableOpacity style={{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'gray',
        height:40,
        width:60,
        borderRadius:10,
      }} onPress={()=>navigation.navigate("SingleVendor",{
        vendorId:props.id,
         price:price,
        serviceId:props.serviceId,
      })}>
        <Text style={{
            color:'white',
        }}>Get Now</Text>
      </TouchableOpacity>
      )}
     
    </SafeAreaView>
  );
};

export default VendorData;

const styles = StyleSheet.create({});
