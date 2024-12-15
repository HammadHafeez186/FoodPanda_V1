import { Pressable, FlatList, Text, View, Image, Share, Platform } from "react-native";
import React, { useRef, useCallback, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import * as ImagePicker from 'expo-image-picker';
import menu from "../../data/MenuData.json";
import FoodItem from "../../components/FoodItem";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, addToCart } from "../../redux/CartReducer";
import HotelPageStyles from "../../Styles/HotelPageStyles";
import Modal from "react-native-modal";

const HotelPage = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const flatListRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Camera functionality
    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log('Captured Image URI:', result.assets[0].uri);
        }
    };

    // Share functionality
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `Check out ${params.name}, a Pakistani Fast Food restaurant! 🍽️`,
                title: `Share ${params.name}`,
                url: Platform.OS === 'ios' ? '' : '', // Add a URL if available
            }, {
                excludedActivityTypes: ['com.apple.UIKit.activity.PostToWeibo', 'com.apple.UIKit.activity.Print'],
            });

            if (result.action === Share.dismissedAction) {
                console.log("Share action dismissed");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const scrollToCategory = useCallback((index) => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index, animated: true });
        }
    }, []);

    const ListHeaderComponent = () => (
        <>
            <View style={HotelPageStyles.arrowContainer}>
                <Ionicons
                    onPress={() => router.back()}
                    style={HotelPageStyles.ionicons}
                    name="arrow-back"
                    size={24}
                    color="black"
                />
                <View style={HotelPageStyles.threeIconsContainer}>
                    <Pressable onPress={openCamera}>
                        <SimpleLineIcons name="camera" size={24} color="black" />
                    </Pressable>
                    <Pressable>
                        <Ionicons name="bookmark-outline" size={24} color="black" />
                    </Pressable>
                    <Pressable onPress={onShare}>
                        <Ionicons name="share-outline" size={24} color="black" />
                    </Pressable>
                </View>
            </View>

            <View style={HotelPageStyles.paramsOuterContainer}>
                <Text style={HotelPageStyles.nameText}>{params.name}</Text>
                <Text style={HotelPageStyles.descriptionText}>Pakistani Fast Food</Text>
                <View style={HotelPageStyles.aggregateOuterContainer}>
                    <View style={HotelPageStyles.aggregate_ratingContainer}>
                        <Text style={HotelPageStyles.aggregateText}>
                            {params.aggregate_rating}
                        </Text>
                        <Ionicons name="star" size={15} color="white" />
                    </View>
                    <Text style={HotelPageStyles.ratingTextStyle}>3.2k ratings</Text>
                </View>
                <View style={HotelPageStyles.waitTimeContainer}>
                    <Text style = {{color: "white"}}>30-40 mins 6km Johar Town</Text>
                </View>
            </View>
        </>
    );

    const menuWithIds = menu.map((item, index) => ({
        ...item,
        id: item.id || index,
    }));

    const handleAddToCart = (foodItem) => {
        const existingItem = cart.find(item => item.id === foodItem.id);
        if (existingItem) {
            dispatch(incrementQuantity({ id: foodItem.id }));
        } else {
            dispatch(addToCart({ ...foodItem, quantity: 1 }));
        }
    };

    const renderItem = ({ item }) => (
        <FoodItem item={item} key={item.id} onAddToCart={() => handleAddToCart(item)} />
    );

    return (
        <>
            <FlatList
                ref={flatListRef}
                data={menuWithIds}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={ListHeaderComponent}
                contentContainerStyle={HotelPageStyles.mainContainer}
                showsVerticalScrollIndicator={false}
            />

            <View style={{ flexDirection: "row", backgroundColor: "white" }}>
                {menuWithIds.map((item, index) => (
                    <Pressable
                        onPress={() => scrollToCategory(index)}
                        key={item.id}
                        style={HotelPageStyles.menuButton}
                    >
                        <Text>{item.name}</Text>
                    </Pressable>
                ))}
            </View>

            <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={[HotelPageStyles.menuPressable, { bottom: cart.length > 0 ? 70 : 35 }]}
            >
                <Ionicons style={{ textAlign: "center" }} name="fast-food-outline" size={24} color="white" />
                <Text style={HotelPageStyles.menuPressableText}>Menu</Text>
            </Pressable>

            {cart.length > 0 && (
                <Pressable
                    onPress={() => router.push({ pathname: "/Cart", params: { name: params.name } })}
                    style={HotelPageStyles.cartPressableContainer}
                >
                    <Text style={HotelPageStyles.cartText}>
                        {cart.reduce((total, item) => total + item.quantity, 0)} items added.
                    </Text>
                    <Text style={HotelPageStyles.cartItemsMin}>
                        Add item(s) worth Rs.500 to place Order
                    </Text>
                </Pressable>
            )}

            <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(!modalVisible)}>
                <View style={HotelPageStyles.modalContainer}>
                    {menu.map((item, index) => (
                        <View
                            style={HotelPageStyles.mapContainer}
                            key={index}
                        >
                            <Text style={HotelPageStyles.modalText}>{item.name}</Text>
                            <Text style={HotelPageStyles.modalText}>{item.items.length}</Text>
                        </View>
                    ))}
                    <Image style={HotelPageStyles.modalImage} source={require("../../images/logo.png")} />
                </View>
            </Modal>
        </>
    );
};

export default HotelPage;
