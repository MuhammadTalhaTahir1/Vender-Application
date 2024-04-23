import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Image } from 'react-native';
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
  import { db } from '../../firebase/FirebaseConfig';
import { Title } from 'react-native-paper';
const Service = (props) => {
    const[picture,setPicture]=useState(null);
    const[title,setTitle]=useState(null);
    const [req,setReq]=useState(props.req);
    useEffect(() => {
       const readService=async()=>{
        const ref = doc(db, "category", props.id);
        
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
         setPicture(docSnap.data().picture);
         setTitle(docSnap.data().title);
        }
       }
       readService();
    },[props.id])
  return (
    <View style={{
        alignItems:'center',
        
    }}>
    {req==="personal" && (
      <View
      style={{
        alignItems:'center'
      }}>
      <Image
      source={{
        uri:picture
      }}
      style={{
        width:50,
        height:50,
        borderRadius:40,
      }}
       />
       <Text
       style={{
        fontSize:15,
       }}
       >
            {title}
       </Text>
      </View>
    )}
    {req!=="personal" && (
      <View
      style={{
        alignItems:'center'
      }}
      >
      <Image
      source={{
        uri:picture
      }}
      style={{
        width:70,
        height:70,
        borderRadius:40,
      }}
       />
       <Title>
            {title}
       </Title>
      </View>
    )}
    </View>
  )
}

export default Service

const styles = StyleSheet.create({})