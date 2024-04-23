import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BottomBar = (props) => {
    const navigation=useNavigation();
  return (
    <SafeAreaView
    style={{height:'100%',
    marginHorizontal:10,
    
    }}
    >
      {props.type==='customer' && (
        <View
        style={{
          flexDirection: "row",
          alignItems:'center',
        justifyContent:'space-between',

        }}
      >
      
       <TouchableOpacity
       style={{
        alignItems:'center',
        
       }}
       onPress={()=>navigation.navigate("Home")}
       >
       <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ2LCFBHK2PCgKe23OjKar5-EaQroTi0ren0H09qlKOWRDiH9nHeu2xDQqYMP88leJrWE&usqp=CAU",
          }}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <Text>
            Home
        </Text>
       </TouchableOpacity>
       <TouchableOpacity
       style={{
        alignItems:'center',
        justifyContent:'space-between',
       }}
       onPress={()=>navigation.navigate("Orders")}
       >
       <Image
          source={{
            uri: "https://w7.pngwing.com/pngs/154/333/png-transparent-purchase-order-computer-icons-icon-design-form-purchase-order-icon-angle-text-form.png",
          }}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <Text>
            Orders
        </Text>
       </TouchableOpacity>
       <TouchableOpacity
       style={{
        alignItems:'center',
        justifyContent:'space-between',
       }}
       onPress={()=>navigation.navigate("ChatsScreen")}
       >
       <Image
          source={{
            uri: "https://w7.pngwing.com/pngs/301/114/png-transparent-message-board-online-chat-computer-icons-conversation-livechat-chat-room-chat-miscellaneous-angle-text.png",
          }}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <Text>
            CHATS
        </Text>
       </TouchableOpacity>
       <TouchableOpacity
       style={{
        alignItems:'center',
        justifyContent:'space-between',
       }}
       >
       <Image
          source={{
            uri: "https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-notification-icon-png-image_4187244.jpg",
          }}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <Text>
            CHATS
        </Text>
       </TouchableOpacity>
      </View>
      )}
      {props.type==='vendor' && (
        <View
        style={{
          flexDirection: "row",
          alignItems:'center',
        justifyContent:'space-between',

        }}
      >
      
       <TouchableOpacity
       style={{
        alignItems:'center',
        
       }}
       onPress={()=>navigation.navigate("VendorHome")}
       >
       <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ2LCFBHK2PCgKe23OjKar5-EaQroTi0ren0H09qlKOWRDiH9nHeu2xDQqYMP88leJrWE&usqp=CAU",
          }}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <Text>
            Home
        </Text>
       </TouchableOpacity>
       <TouchableOpacity
       style={{
        alignItems:'center',
        justifyContent:'space-between',
       }}
       onPress={()=>navigation.navigate("MyOrders")}
       >
       <Image
          source={{
            uri: "https://w7.pngwing.com/pngs/154/333/png-transparent-purchase-order-computer-icons-icon-design-form-purchase-order-icon-angle-text-form.png",
          }}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <Text>
            Orders
        </Text>
       </TouchableOpacity>
       <TouchableOpacity
              onPress={()=>navigation.navigate("VendorChatScreen")}

       style={{
        alignItems:'center',
        justifyContent:'space-between',
       }}
       >
       <Image
          source={{
            uri: "https://w7.pngwing.com/pngs/301/114/png-transparent-message-board-online-chat-computer-icons-conversation-livechat-chat-room-chat-miscellaneous-angle-text.png",
          }}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <Text>
            CHATS
        </Text>
       </TouchableOpacity>
       <TouchableOpacity
       style={{
        alignItems:'center',
        justifyContent:'space-between',
       }}
       onPress={()=>navigation.navigate("NofiScreen")}
       >
       <Image
          source={{
            uri: "https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-notification-icon-png-image_4187244.jpg",
          }}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <Text>
            Noti
        </Text>
       </TouchableOpacity>
      </View>
      )}
    </SafeAreaView>
  );
};

export default BottomBar;

const styles = StyleSheet.create({});
