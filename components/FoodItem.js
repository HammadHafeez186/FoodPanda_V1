import {StyleSheet, View, Text, Pressable, FlatList} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from "react";
import MenuItems from "./MenuItems";

const FoodItem = ({item}) => {
    const data = [item];

    // Render function for menu items
    const renderMenuItems = ({item: menuItem}) => (
        <MenuItems 
            key={menuItem.id || `${item.name}-${menuItem.name}`}
            item={menuItem}
        />
    );

    // Render function for main food item
    const renderFoodItem = ({item: foodItem}) => (
        <View key={foodItem.id || foodItem.name}>
            <Pressable style={styles.pressableContainer}>
                <Text style={styles.recommendedTagStyle}>
                    {foodItem?.name} ({foodItem.items.length})
                </Text>
                <FontAwesome name="angle-down" size={24} color="black" />
            </Pressable>
            <FlatList
                data={foodItem.items}
                renderItem={renderMenuItems}
                keyExtractor={(menuItem) => menuItem.id || `${foodItem.name}-${menuItem.name}`}
                scrollEnabled={false} // Prevent nested scrolling
            />
        </View>
    );

    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderFoodItem}
                keyExtractor={(foodItem) => foodItem.id || foodItem.name}
                scrollEnabled={false} // Prevent nested scrolling
            />
        </View>
    );
}

export default FoodItem;

const styles = StyleSheet.create({
    pressableContainer: {
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    recommendedTagStyle: {
        fontSize: 19,
        fontWeight: "bold",
    }
});

// import {StyleSheet, View, Text, Pressable} from "react-native";
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import React from "react";
// import MenuItems from "./MenuItems";


// const FoodItem = ({item}) => {
//     const data = [item];
//     return (
//         <View>
//             {data?.map((item,index) => (
//                 <>
//             <Pressable style={styles.pressableContainer} key={index}>
//                 <Text style={styles.recommendedTagStyle}>{item?.name} ({item.items.length})</Text>
//                 <FontAwesome name="angle-down" size={24} color="black" />
//             </Pressable>
//                     {item.items.map((item,index) => (
//                     <MenuItems key={index} item={item}/>
//                     ))}
//                 </>

//             ))}
//         </View>
//     );
// }

// export default FoodItem;

// const styles = StyleSheet.create({
//     pressableContainer: {
//         margin:10,
//         flexDirection: "row",
//         alignItems:"center",
//         justifyContent: "space-between"
//     },
//     recommendedTagStyle: {
//         fontSize:19,
//         fontWeight:"bold",
//     }
// });