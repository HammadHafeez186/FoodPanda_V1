import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ACCENT_COLOR = '#FF2B85';

export const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: ACCENT_COLOR,
        marginBottom: 20,
        textAlign: 'center'
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 20
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        borderWidth: 2,
        borderColor: ACCENT_COLOR
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: ACCENT_COLOR
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        width: '100%'
    },
    starButton: {
        marginHorizontal: 5
    },
    textInput: {
        width: '90%',
        minHeight: 120,
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        padding: 15,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: ACCENT_COLOR,
        marginBottom: 20
    },
    imageSection: {
        width: '90%',
        marginBottom: 20
    },
    imagePickerOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    pickImageButton: {
        backgroundColor: ACCENT_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8,
        width: '48%'
    },
    pickImageText: {
        color: 'white',
        marginLeft: 10,
        fontWeight: 'bold'
    },
    imagePreviewContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden'
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    removeImageButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    submitButton: {
        backgroundColor: ACCENT_COLOR,
        padding: 15,
        borderRadius: 10,
        width: '48%',
        alignItems: 'center'
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    skipButton: {
        backgroundColor: '#F0F0F0',
        padding: 15,
        borderRadius: 10,
        width: '48%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: ACCENT_COLOR
    },
    skipButtonText: {
        color: ACCENT_COLOR,
        fontWeight: 'bold',
        fontSize: 16
    }
});

