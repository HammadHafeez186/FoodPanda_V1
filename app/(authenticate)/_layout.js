import { Stack } from "expo-router";
import {Provider} from "react-redux";
import store from "../../store";

export default function _layout() {
    return (
        <Provider store={store}>
        <Stack>
            <Stack.Screen name="Login" options={{ headerShown: false }} />
            <Stack.Screen name="Register" options={{ headerShown: false }} />
            <Stack.Screen name="Accounts" options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPass" options={{ headerShown: false }} />
        </Stack>
        </Provider>
    );
}
