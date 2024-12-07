import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    textInput: {
        height: 150,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        textAlignVertical: "top",
    },
    imagePickerOptions: {
        marginBottom: 20,
    },
    pickImageButton: {
        backgroundColor: "#fd5c63",
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },
    pickImageText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageContainer: {
        marginBottom: 20,
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: "#fd5c63",
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },
    submitButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    skipButton: {
        backgroundColor: "#f5f5f5",
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
    },
    skipButtonText: {
        color: "#fd5c63",
        fontSize: 16,
        fontWeight: "bold",
    },
});
