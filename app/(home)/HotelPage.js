import {Pressable, FlatList, Text, View, Image} from "react-native";
import React, {useRef, useCallback} from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import menu from "../../data/MenuData.json";
import FoodItem from "../../components/FoodItem";
import { useSelector } from "react-redux";
import HotelPageStyles from "../../Styles/HotelPageStyles";
import Modal from "react-native-modal";

const HotelPage = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const cart = useSelector(state => state.cart);
    const flatListRef = useRef(null);
    const [modalVisible, setModalVisible] = React.useState(false);

    const scrollToCategory = useCallback((index) => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
                index: index,
                animated: true,

            });
        }
    }, []);

    // Header component to be rendered at the top of FlatList
    const ListHeaderComponent = () => (
        <>
            <View style={HotelPageStyles.arrowContainer}>
                <Ionicons onPress={() => router.back()} style={HotelPageStyles.ionicons} name="arrow-back" size={24} color="black" />
                <View style={HotelPageStyles.threeIconsContainer}>
                    <SimpleLineIcons name="camera" size={24} color="black" />
                    <Ionicons name="bookmark-outline" size={24} color="black" />
                    <Ionicons name="share-outline" size={24} color="black" />
                </View>
            </View>

            <View style={HotelPageStyles.paramsOuterContainer}>
                <Text style={HotelPageStyles.nameText}>{params.name}</Text>
                <Text style={HotelPageStyles.descriptionText}>Pakistani Fast Food</Text>
                <View style={HotelPageStyles.aggregateOuterContainer}>
                    <View style={HotelPageStyles.aggregate_ratingContainer}>
                        <Text style={HotelPageStyles.aggregateText}>{params.aggregate_rating}</Text>
                        <Ionicons name="star" size={15} color="white" />
                    </View>
                    <Text style={HotelPageStyles.ratingTextStyle}>3.2k ratings</Text>
                </View>
                <View style={HotelPageStyles.waitTimeContainer}>
                    <Text>30-40 mins 6km Johar Town</Text>
                </View>
            </View>
        </>
    );

    // Ensure menu items have unique IDs
    const menuWithIds = menu.map((item, index) => ({
        ...item,
        id: item.id || index, // Use index as fallback
    }));

    const renderItem = ({ item }) => (
        <FoodItem
            item={item}
            key={item.id}
        />
    );

    return (
        <>
            <FlatList
                ref={flatListRef}
                data={menuWithIds}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id.toString()}
                ListHeaderComponent={ListHeaderComponent}
                contentContainerStyle={HotelPageStyles.mainContainer}
                showsVerticalScrollIndicator={false}
            />

            <View style={{ flexDirection: "row", backgroundColor: "white" }}>
                {menuWithIds.map((item, index) => (
                    <Pressable
                        onPress={() => scrollToCategory(index)}
                        key={item.id}
                        style={{
                            borderRadius:4,
                            paddingHorizontal:7,
                            paddingVertical:5,
                            marginVertical:10,
                            marginHorizontal:10,
                            alignItems:"center",
                            justifyContent:"center",
                            borderColor:"#181818",
                            borderWidth:1
                        }}
                    >
                        <Text>{item.name}</Text>
                    </Pressable>
                ))}
            </View>

            <Pressable onPress={() => setModalVisible(!modalVisible )}
                style={{width:60,height:60, borderRadius:30,justifyContent:"center",alignItems:"center",position:"absolute",right:25,bottom:cart.length > 0 ? 70 : 35,backgroundColor:"black"}}>
                <Ionicons style={{textAlign:"center"}} name="fast-food-outline" size={24} color="white" />
                <Text style={{textAlign:"center",color:"white",fontWeight:500,fontSize:11,marginTop:3}}>Menu</Text>
            </Pressable>

            {cart.length > 0 && (
                <Pressable onPress={() =>
                router.push({
                    pathname: "/Cart",
                    params: {
                        name: params.name,
                    },
                })} style={HotelPageStyles.cartPressableContainer}>
                    <Text style={HotelPageStyles.cartText}>{cart.length} items added.</Text>
                    <Text style={HotelPageStyles.cartItemsMin}>Add item(s) worth Rs.500 to place Order</Text>
                </Pressable>

            )}
            <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(!modalVisible)}>
               <View style={{height:190,width:250,backgroundColor:"black",position:"absolute",bottom:35,right:10,borderRadius:7}}>
                   {menu.map((item, index) => (
                       <View style={{padding:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}} key={index}>
                           <Text style={{color:"#d0d0d0",fontWeight:600,fontSize:18}}>{item.name}</Text>
                           <Text style={{color:"#d0d0d0",fontWeight:600,fontSize:18}}>{item.items.length}</Text>
                       </View>
                   ))}
                   <Image
                       style={{
                           width: "65%",
                           height: 85,
                           resizeMode: "cover",
                           alignSelf: "center",
                           marginVertical: 10,
                           marginBottom:5
                       }}
                   source={
                       require("../../images/newPng.png")
                   }
                   />
                </View>
            </Modal>

        </>

    );
};

export default HotelPage;