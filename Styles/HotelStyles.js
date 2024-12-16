import {StyleSheet} from "react-native";


const hotelStyles = StyleSheet.create({
    image:{
        width: "100%",
        aspectRatio: 6/4,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    pressableStyle:{
        marginHorizontal:6,
        marginVertical:12,
        borderRadius:20,
        backgroundColor:"white"
    },
    aggregate_rating:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#FF2B85",
        borderRadius:4,
        paddingHorizontal:5,
        paddingVertical:5,
        marginRight:10

    },
    outerContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:10
    },
    name:{
        paddingHorizontal:10,
        marginTop:10,
        fontSize:16,
        fontWeight:"600"
    },
    cuisines:{
        paddingHorizontal:10,
        marginTop:3,
        fontSize:15,
        fontWeight:"500",
        color:"grey"
    },
    time:{
        paddingHorizontal:10,
        marginTop:3,
        fontSize:14,
        fontWeight:"500",
        color:"#505050"
    },
    ratings:{
        textAlign:"center",
        color:"white"
    },

    styleInBetween:{
        borderWidth:0.5,
        borderColor:"#c8c8c8",
        marginHorizontal:10,
        marginVertical:5
    },
    discountView:{
        flexDirection:"row",
        alignItems:"center",
        gap:4,
        marginHorizontal:8,
        marginVertical:8
    },
    discountText:{
        marginLeft:2,
        color:"#FF2B85",
        fontWeight:"500"

    }
});

    export default hotelStyles;