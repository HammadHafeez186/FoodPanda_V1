import { StyleSheet } from 'react-native';

const FoodItemStyles = StyleSheet.create({
    pressableContainer: {
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    recommendedTagStyle: {
        fontSize: 19,
        fontWeight: "bold",
    }
});

export default FoodItemStyles;
