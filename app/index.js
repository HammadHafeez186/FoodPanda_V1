import { Redirect } from "expo-router";
import { StyleSheet,Text,View } from "react-native";
import React from "react";

const Index = () => {
    return <Redirect href={"/(authenticate)/Login" }/>;
};

export default Index;
