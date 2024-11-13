import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const items = [
    {
        id: "1",
        name: "fastest delivery",
    },
    {
        id: "2",
        name: "rating 4.0+",
    },
    {
        id: "3",
        name: "offers",
    },
    {
        id: "4",
        name: "cuisines",
    },
    {
        id: "5",
        name: "MAX Safety",
    },
    {
        id: "6",
        name: "Pro",
    },
];

const Categories = () => {
    return (
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.8} style={styles.category}>
                        <View style={styles.container}>
                            <Text style={styles.categoryText}>{item?.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 5,
        backgroundColor: "#DB7093",
        borderRadius:8
    },
    category: {
        marginTop:5
    },
    categoryText: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
        paddingHorizontal:5,
    },
});
