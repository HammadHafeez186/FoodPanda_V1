import {StyleSheet, View, Text, Pressable} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from "react";
import MenuItems from "./MenuItems";


const FoodItem = ({item}) => {
    const data = [item];
    return (
        <View>
            {data?.map((item,index) => (
                <>
            <Pressable style={styles.pressableContainer} key={index}>
                <Text style={styles.recommendedTagStyle}>{item?.name} ({item.items.length})</Text>
                <FontAwesome name="angle-down" size={24} color="black" />
            </Pressable>
                    {item.items.map((item,index) => (
                    <MenuItems key={index} item={item}/>
                    ))}
                </>

            ))}
        </View>
    );
}

export default FoodItem;

const styles = StyleSheet.create({
    pressableContainer: {
        margin:10,
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "space-between"
    },
    recommendedTagStyle: {
        fontSize:19,
        fontWeight:"bold",
    }
});