import {Pressable, FlatList, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useLocalSearchParams, useRouter} from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import menu from "../../data/MenuData.json";
import FoodItem from "../../components/FoodItem";
import {useSelector} from "react-redux";

const hotelPage = () => {
    const params = useLocalSearchParams()
    const router = useRouter();
    const cart = useSelector(state => state.cart);
    
    // Header component to be rendered at the top of FlatList
    const ListHeaderComponent = () => (
        <>
            <View style={styles.arrowContainer}>
                <Ionicons onPress={() => router.back()} style={styles.ionicons} name="arrow-back" size={24} color="black"/>
                <View style={styles.threeIconsContainer}>
                    <SimpleLineIcons name="camera" size={24} color="black"/>
                    <Ionicons name="bookmark-outline" size={24} color="black"/>
                    <Ionicons name="share-outline" size={24} color="black"/>
                </View>
            </View>

            <View style={styles.paramsOuterContainer}>
                <Text style={styles.nameText}>{params.name}</Text>
                <Text style={styles.descriptionText}>Pakistani Fast Food</Text>
                <View style={styles.aggregateOuterContainer}>
                    <View style={styles.aggregate_ratingContainer}>
                        <Text style={styles.aggregateText}>{params.aggregate_rating}</Text>
                        <Ionicons name="star" size={15} color="white" />
                    </View>
                    <Text style={styles.ratingTextStyle}>3.2k ratings</Text>
                </View>
                <View style={styles.waitTimeContainer}>
                    <Text>30-40 mins 6km Johar Town</Text>
                </View>
            </View>
        </>
    );

    
    // Make sure your menu items have unique IDs
    // If they don't, you might want to add them when preparing the data
    const menuWithIds = menu.map((item, index) => ({
        ...item,
        id: item.id || `item-${index}` // Use existing ID or create one
    }));
    
    const renderItem = ({item}) => (
        <FoodItem 
            item={item}
            key={item.uniqueId} // Add key here as well
        />
    );

    return (
        <>
            <FlatList
                data={menuWithIds}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={ListHeaderComponent}
                contentContainerStyle={styles.mainContainer}
                showsVerticalScrollIndicator={false}
            />

            {cart.length > 0 && (
                <Pressable style={styles.cartPressableContainer}>
                    <Text style={styles.cartText}>{cart.length} items added.</Text>
                    <Text style={styles.cartItemsMin}>Add item(s) worth Rs.500 to place Order</Text>
                </Pressable>
            )}
        </>
    );
}

export default hotelPage;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "white",
        flexGrow: 1,
    },
    threeIconsContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        gap:10,
    },
    arrowContainer: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    ionicons: {
        padding: 5,
    },
    aggregate_ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#006a4e",
        borderRadius: 4,
        paddingHorizontal:4,
        paddingVertical: 5,
        gap: 4,
    },
    aggregateText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    ratingTextStyle: {
        fontSize: 15,
        fontWeight: "500",
        marginLeft: 5,
    },
    paramsOuterContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical:12
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    descriptionText: {
        marginTop: 5,
        color: "gray",
        fontWeight: "500",
        fontSize: 15,
    },
    aggregateOuterContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 10,
    },
    waitTimeContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d0f0c0",
        borderRadius:20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 12,
    },
    cartText: {
        textAlign: "center",
        color: "white",
        fontSize: 15,
        fontWeight: "500",
    },
    cartPressableContainer:{
        backgroundColor: "#fd5c63",
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    cartItemsMin: {
        textAlign: "center",
        color: "white",
        marginTop: 5,
        fontWeight: "600",
    }
});