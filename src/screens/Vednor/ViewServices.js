import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
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
import { auth, db } from "../../../firebase/FirebaseConfig";
import Service from "../../components/Service";
import { ScrollView } from "react-native";
const ViewServices = ({navigation}) => {
  const [data, setData] = useState([]);
  const [type, setType] = useState('all');
  useLayoutEffect(() => {
    if(type=='all')
    {
      const ref = doc(db, "User", auth.currentUser.uid);
      const docRef = collection(ref, "Services");
      onSnapshot(docRef, (categories) =>
        setData(
          categories.docs.map((category) => ({
            id: category.id,
            data: category.data(),
          }))
        )
      );
    }
    else
    {
      const ref = doc(db, "User", auth.currentUser.uid);
      const docRef = collection(ref, "Services");
      const q=query(docRef,where("status","==",type));
      
      onSnapshot(q, (categories) =>
        setData(
          categories.docs.map((category) => ({
            id: category.id,
            data: category.data(),
          }))
        )
      );
    }
  
  }, [type]);
  const editService=(id,status,price)=>{
    navigation.navigate("EditService",{
      sId:id,
      price:price,
      status:status,
    })
  }
  return (
    <View>
      <View style={{
        flexDirection:'row',
        justifyContent:'space-evenly',
        padding:10,
        backgroundColor:'white'
      }}>
        <TouchableOpacity onPress={()=>setType("all")} style={{
           backgroundColor:'green',
           height:45,
           width:'30%',
           borderRadius:20,
           justifyContent:'center',
           alignItems:'center'
        }}>
          <Text style={{
            color:'white'
          }}>
              All
          </Text>
        </TouchableOpacity>
       
        <TouchableOpacity onPress={()=>setType(true)} style={{
           backgroundColor:'green',
           height:45,
           width:'30%',
           borderRadius:20,
           justifyContent:'center',
           alignItems:'center'
        }}>
          <Text style={{
            color:'white'
          }}>
              Activated
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setType(false)} style={{
           backgroundColor:'green',
           height:45,
           width:'30%',
           borderRadius:20,
           justifyContent:'center',
           alignItems:'center'
        }}>
          <Text style={{
            color:'white'
          }}>
              Closed
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {data.map((item, key) => (
          <TouchableOpacity
            style={{
              justifyContent: "space-evenly",
              alignItems:'center',
              flexDirection: "row",
              padding: 10,
              margin: 10,
              backgroundColor: "white",
            }}
            onPress={()=>editService(item.id,item.data.status,item.data.price)}
          >
            <Service id={item.id} />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>
                {item.data.price && item.data.price}
                {!item.data.price && 0}
              </Text>
              <Text>Price/Hour</Text>
            </View>
            <View style={{
                backgroundColor:'green',
                height:45,
                width:70,
                borderRadius:20,
                justifyContent:'center',
                alignItems:'center'
            }}
           
            >
                <Text style={{
                    color:'white'
                }}>
                    Edit
                </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ViewServices;

const styles = StyleSheet.create({});
