import { StyleSheet } from 'react-native';

const CategoriesStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 5,
        backgroundColor: "#DB7093",
        borderRadius: 8,
    },
    category: {
        marginTop: 5,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
        paddingHorizontal: 5,
    },
});

export default CategoriesStyles;
