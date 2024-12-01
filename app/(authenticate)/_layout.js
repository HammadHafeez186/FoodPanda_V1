import { Stack } from "expo-router";

export default function _layout() {
    return (
        <Stack>
            <Stack.Screen name="Login" options={{ headerShown: false }} />
            <Stack.Screen name="Register" options={{ headerShown: false }} />
            <Stack.Screen name="Accounts" options={{ headerShown: false }} />
        </Stack>
    );
}
