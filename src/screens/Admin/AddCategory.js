import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useLayoutEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase/FirebaseConfig";
const AddCategory = ({ navigation, route }) => {
  //Header
  const [imgUrl, setImgUrl] = useState(null);
  const [dbImage, setDbImage] = useState(null);
  const [showPic, setShowPic] = useState(null);
  const [title, setTitle] = useState(null);

  useLayoutEffect(() => {
    const ReadDoc = async () => {
      const docRef = doc(db, "category", route.params.id);
      const doc1 = await getDoc(docRef);

      if (doc1.exists()) {
        setShowPic(doc1.data().picture);
        setTitle(doc1.data().title);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    if (route.params.type == "Edit") {
      ReadDoc();
    }
  }, []);

  useLayoutEffect(() => {
    const uploadImage = async () => {
      // 1- set metadata
      const metadata = {
        contentType: "image/jpeg",
      };

      // convert image into blob
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", imgUrl, true);
        xhr.send(null);
      });

      // upload img on storage

      const storageRef = ref(storage, "Profiles/" + Date.now());

      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setDbImage(downloadURL);
            setShowPic(downloadURL);
            setImgUrl(null);
          });
        }
      );
    };
    if (imgUrl != null) {
      uploadImage();
      setImgUrl(null);
    }
    //   const setImageUrlOnDb=async()=>{

    //     setDbImage(null);
    //   }
  }, [imgUrl, dbImage]);

  const PickImg = async () => {
    {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImgUrl(result.uri);
      }
    }
  };

  const saveData = async () => {
    if (route.params.type == "Edit") {
      const washingtonRef = doc(db, "category", route.params.id);

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        picture: showPic,
        title: title,
        timestamp: serverTimestamp(),
      }).then(()=>{
        navigation.navigate("Admindashboard");
        alert("Updated Successfully")
      })
      
      ;

      // await setDoc(doc(db, "category",  route.params.id), {

      // });
    } else {
      if (showPic != null && title != null) {
        await addDoc(collection(db, "category"), {
          picture: showPic,
          title: title,
          timestamp: serverTimestamp(),
        }).then(() => {
          navigation.navigate("Admindashboard");
          alert("Added successfully")
        });
      } else {
        alert("Please Enter Full");
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        alignContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          margin: 5,
        }}
        onPress={() => PickImg()}
      >
        <Image
          source={{
            uri: showPic,
          }}
          style={{
            height: 250,
            width: 250,
            backgroundColor: "grey",
            borderRadius: 10,
          }}
        />

        <Text
          style={{
            position: "absolute",
            top: 100,
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Add Photo
        </Text>
      </TouchableOpacity>

      <TextInput
        value={title}
        label={"Enter Title"}
        onChangeText={(text) => setTitle(text)}
      />

      <View
        style={{
          alignItems: "center",
        }}
      >
        {route.params.type == "Add" && (
          <TouchableOpacity
            style={{
              backgroundColor: "#fb5b5a",
              height: 60,
              width: 150,
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => saveData()}
          >
            <Text
              style={{
                justifyContent: "center",
                fontSize: 15,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Save Data
            </Text>
          </TouchableOpacity>
        )}
        {route.params.type == "Edit" && (
          <TouchableOpacity
            style={{
              backgroundColor: "#fb5b5a",
              height: 60,
              width: 150,
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => saveData()}
          >
            <Text
              style={{
                justifyContent: "center",
                fontSize: 15,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Save Changes
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddCategory;
const styles = StyleSheet.create({});
