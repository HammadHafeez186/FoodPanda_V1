import { StyleSheet } from 'react-native';

const CarouselStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    imageWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        borderRadius: 15,
        width: "94%",
        height: 200,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    dotContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#90A4AE",
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: "#13274f",
    },
});

export default CarouselStyles;
