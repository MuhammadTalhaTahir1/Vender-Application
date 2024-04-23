import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";

const Picture = ({ navigation, route }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={{
          uri: route.params.pic,
        }}
        style={{
          height: 300,
          width: "100%",
        }}
      />
    </View>
  );
};

export default Picture;

const styles = StyleSheet.create({});
