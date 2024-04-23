import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react';
import * as DocumentPicker from "expo-document-picker";
const ForMultipleFiles = () => {
    
    const MultipleFiles=async()=>{
        
        const pickerResult = await DocumentPicker.getDocumentAsync({
            type: mediaType,
            copyToCacheDirectory: true,
            multiple: props.allowsMultipleSelection
        });
        console.log(pickerResult.uri);
    console.log(pickerResult);
         
    }
  return (
    <View>
       <View
        style={{
          margin: 15,
        }}
      >
        <TouchableOpacity onPress={() => MultipleFiles()}>
          <Text>for Multiple</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ForMultipleFiles

const styles = StyleSheet.create({})