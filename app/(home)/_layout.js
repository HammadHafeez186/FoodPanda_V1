import { Stack } from "expo-router";
import {Provider} from "react-redux";
import store from "../../store";


export default function layout() {
    return (
        <Provider store={store}>
            <Stack screenOptions={{headerShown:false}}>
                <Stack.Screen name="MainPage"/>
                <Stack.Screen name="Cart"/>
                <Stack.Screen name="Order"/>
                <Stack.Screen name="AddressScreen"/>
            </Stack>
        </Provider>


    );
}