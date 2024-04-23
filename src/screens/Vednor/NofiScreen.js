import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import {
  SwipeItem,
  SwipeButtonsContainer,
  SwipeProvider,
} from "react-native-swipe-item";
import { Image } from "react-native";
import Slideshow from 'react-native-image-slider-show';
const NofiScreen = ({navigation}) => {
  const [status, setStatus] = useState(true);

  const leftButton = (
    <SwipeButtonsContainer
      style={{
        alignSelf: "center",
        aspectRatio: 1,
        flexDirection: "column",
        padding: 10,
      }}
    >
      <TouchableOpacity onPress={() => alert("OK ")}>
        <Text>Click me !</Text>
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );
  //  useLayoutEffect(() => {
  //    alert("asdsa")

  //  },[status])
  const details = () => [alert("hasdhasd"), setStatus(false)];
  const forBack = () => {
    setStatus(true);
  };
  return (
    <View
      style={{
        alignItems: "center",
        height: "100%",
      }}
    >
      <View
        style={{
          marginTop: 1,
          height: "11%",
          width: "100%",
          borderColor: "black",
          borderWidth: 2,
          backgroundColor: "green",
        }}
      >
        {status === true && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                marginTop: 24,
              }}
            >
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Lionel_Messi_20180626.jpg/640px-Lionel_Messi_20180626.jpg",
                }}
                style={{
                  height: 40,
                  width: 40,
                  resizeMode: "contain",
                  borderRadius: 15,
                }}
              />
            </View>
          </View>
        )}
        {status === false && (
          <View style={{ margin: 25 }}>
            <TouchableOpacity onPress={forBack}>
              <Text>sda</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* not a good slider */}
      <SwipeProvider>
        <SwipeItem
          style={styles.button}
          swipeContainerStyle={styles.swipeContentContainerStyle}
          leftButtons={
            leftButton
            // <View>
            //     <TouchableOpacity>
            //         <Text>
            //             sada
            //         </Text>
            //     </TouchableOpacity>
            // </View>
          }
        >
          <Text>Swipe me!</Text>
        </SwipeItem>
      </SwipeProvider>
      <View
        style={{
          marginTop: 10,
        }}
      >
 <Slideshow 
      dataSource={[
        { url:'http://placeimg.com/640/480/any' },
        { url:'http://placeimg.com/640/480/any' },
        { url:'http://placeimg.com/640/480/any' }

    ]}
    height={200}
    indicatorColor={"#070808"}
    indicatorSelectedColor={"red"}
    indicatorSize={10}
    // scrollEnabled={true}
    />
    
      </View>
      <View style={{alignItems:'center',
      width:'100%'
      }}>
      <TouchableOpacity onPress={()=>navigation.navigate("VideoPicker")}
      style={{
        height:45,
        width:'40%',
        backgroundColor:'red'
      }}
      >
      <Text>
        ada
      </Text>
    </TouchableOpacity>
      </View>
      <View style={{alignItems:'center',
      width:'100%',
      marginTop:10,
      }}>
      <TouchableOpacity onPress={()=>navigation.navigate("VideosPlayerScreen")}
      style={{
        height:45,
        width:'40%',
        backgroundColor:'red'
      }}
      >
      <Text>
        For Call
      </Text>
    </TouchableOpacity>
      </View>
    </View>
  );
};

export default NofiScreen;

const styles = StyleSheet.create({
  button: {
    width: "80%",
    height: 45,
    alignSelf: "center",
    marginVertical: 5,
  },
  swipeContentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderColor: "#e3e3e3",
    borderWidth: 1,
  },
});
