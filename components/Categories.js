import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import CategoriesStyles from '../Styles/CategoriesStyles';
import categoriesData from '../data/categoriesData.json'; 

const Categories = () => {
    return (
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categoriesData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.8} style={CategoriesStyles.category}>
                        <View style={CategoriesStyles.container}>
                            <Text style={CategoriesStyles.categoryText}>{item?.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Categories;
