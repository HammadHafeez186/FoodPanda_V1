import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import hotelsStyles from "../Styles/HotelStyles.js";
import { useRouter } from "expo-router";

const Hotels = ({ item }) => {
    const router = useRouter();
    return (
        <Pressable 
            onPress={() => router.push({
                pathname: "/HotelPage",
                params: { 
                    id: item.id,
                    name: item.name,
                    address: item.address,
                    cuisines: item.cuisines,
                    aggregate_rating: item.aggregate_rating,
                },
            })} 
            style={hotelsStyles.pressableStyle}
        >
            <Image source={{ uri: item.featured_image }} style={hotelsStyles.image} />
            <View style={hotelsStyles.outerContainer}>
                <View>
                    <Text style={hotelsStyles.name}>{item?.name}</Text>
                    <Text style={hotelsStyles.cuisines}>{item?.cuisines}</Text>
                    <Text style={hotelsStyles.time}>{item?.time}</Text>
                </View>
                <View style={[hotelsStyles.aggregate_rating, { backgroundColor: "#006A4E" }]}>
                    <Text style={hotelsStyles.ratings}>{item?.aggregate_rating}</Text>
                    <Ionicons name="star" size={15} color="white" />
                </View>
            </View>
            <View style={hotelsStyles.styleInBetween}/>
            {item.discount && (
                <View style={hotelsStyles.discountView}>
                    <MaterialCommunityIcons name="brightness-percent" size={24} color="#FF2B85" />
                    <Text style={hotelsStyles.discountText}>
                        {item.discount.percentage}% OFF up to Rs. {item.discount.max_discount}
                    </Text>
                </View>
            )}
            {item.discount && (
                <View style={hotelsStyles.discountView}>
                    <MaterialCommunityIcons name="brightness-percent" size={24} color="#FF2B85" />
                    <Text style={hotelsStyles.discountText}>
                        Min order Rs. {item.discount.min_order}
                    </Text>
                </View>
            )}
            {item.is_panda_pro && (
                <View style={hotelsStyles.discountView}>
                    <MaterialCommunityIcons name="brightness-percent" size={24} color="#FF2B85" />
                    <Text style={hotelsStyles.discountText}>Get exclusive discounts with Panda Pro</Text>
                </View>
            )}
        </Pressable>
    );
}

export default Hotels;

