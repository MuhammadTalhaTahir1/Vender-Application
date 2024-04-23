import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
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
  import { auth,db } from '../../firebase/FirebaseConfig';
  import { useNavigation } from '@react-navigation/native';
const Chatting = (props) => {
    const navigation=useNavigation();
    const [picture, setPicture] = useState(null);
    const [name, setName] = useState(null);
    {props.V_id && (
      useEffect(() => {
        const readService = async () => {
          const ref = doc(db, "User", props.V_id);
    
          const docSnap = await getDoc(ref);
          if (docSnap.exists()) {
            setPicture(docSnap.data().picture);
            setName(docSnap.data().name);
          }
        };
        readService();
      }, [props.V_id])
    )}
    {props.C_id && (
      useEffect(() => {
        const readService = async () => {
          const ref = doc(db, "User", props.C_id);
    
          const docSnap = await getDoc(ref);
          if (docSnap.exists()) {
            setPicture(docSnap.data().picture);
            setName(docSnap.data().name);
          }
        };
        readService();
      }, [props.C_id])
    )}

  return (
    <View>
      <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 30,
              margin: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{
                uri: picture,
              }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,

                resizeMode: "contain",
              }}
            />

            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
              }}
            >
              {name}
            </Text>
            <TouchableOpacity
             onPress={()=>navigation.navigate("ChatScreen",{
                id:props.ChatId,
                picture:picture,
                name:name,
                type:props.type,
             })}
            >
              <Text
                style={{
                  backgroundColor: "green",
                  height: 35,
                  width: 80,
                  textAlign: "center",
                  borderRadius: 15,
                  color: "white",
                  fontSize: 15,
                  textAlignVertical: "center",
                }}
              >
                Chat Now
              </Text>
            </TouchableOpacity>
          </View>
    </View>
  )
}

export default Chatting

const styles = StyleSheet.create({})