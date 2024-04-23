import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState,useLayoutEffect } from "react";
import { TextInput } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../../firebase/FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { RadioButton } from 'react-native-paper';

const Register = ({ navigation }) => {
  navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [checked, setChecked] = useState('first');
  const [type, setType] = useState(null);
  const [name, setName] = useState(null);
  


  useLayoutEffect(() => {
    if(checked==='first')
    {
      setType('Customer')
    }
    else if(checked==='second')
    {
      setType('Vendor')
    }
  },[checked])

  
  const register = async () => {
    if(name!= null && email!=null && password!=null)
    {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const SetUser = async () => {
          await setDoc(doc(db, "User", auth.currentUser.uid), {
            email:auth.currentUser.email,
            type:type,
            name:name,
          });
        };
        SetUser();
        if(type=='Customer')
        {
          navigation.replace("Home"); 
        }
        if(type=='Admin')
        {
          navigation.replace("Admindashboard"); 
        }
        if(type=='Vendor')
        {
          navigation.replace("VendorHome"); 
        }
      })
      .catch((error) => {
        alert("Please enter all the details");
      });
    }
    else{
      alert("Please fill all the Boxes to Register a account")
    }
  };
  return (
    <View style={{ height: "100%" }}>
      <View>
        <TextInput
          style={{
            marginBottom: 5,
            
            marginHorizontal: 10,
            backgroundColor: "#D3D3D3",
          }}
          label={"Enter name"}
          activeUnderlineColor="black"
          mode="outlined"
          onChangeText={(text)=>setName(text)}
        />
        <TextInput
          style={{
            marginBottom: 5,
      
            marginHorizontal: 10,
            backgroundColor: "#D3D3D3",
          }}
          label={"Enter Email"}
          onChangeText={(text) => setEmail(text)}
          activeUnderlineColor="black"
          mode="outlined"
        />
        <TextInput
          style={{
            marginBottom: 5,
            borderRadius: 10,
            marginHorizontal: 10,
            backgroundColor: "#D3D3D3",
          }}
          label={"Enter Password"}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          activeUnderlineColor="black"
          mode="outlined"
        />
      </View>
      <View
        style={{
          // flexDirection: "row",

          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#f0e76e",

            height: 40,
            width: 200,
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
          }}
          onPress={() => register()}
        >
          <Text
            style={{
              justifyContent: "center",
              fontSize: 15,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
        
      </View>
      <View>
      <View style={{flexDirection:'row',alignItems:"center"}}>
      <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      />
      <Text>Customer</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:"center"}}>
      <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      />
      <Text>Vendor</Text>
      </View>
    </View>

    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
