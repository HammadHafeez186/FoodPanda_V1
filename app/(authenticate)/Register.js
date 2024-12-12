import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Pressable, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { supabase } from '../../lib/supabase'
import Avatar from '../../components/Avatar'
import { useRouter } from 'expo-router'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [avatarPath, setAvatarPath] = useState('')
    const router = useRouter()

    const handleRegister = async () => {
        try {
            const { data: { user, session }, error } = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) throw error

            const { error: profileError } = await supabase.from('profiles').upsert({
                id: user?.id,
                username,
                full_name: fullName,
                avatar_url: avatarPath,
            })

            if (profileError) throw profileError

            Alert.alert('Registration successful!', 'Please check your email for verification.')
            router.back("../Login")
        } catch (error) {
            Alert.alert('Registration failed', error.message)
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView style={styles.safeAreaContainer}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <View style={styles.mainView}>
                        <Text style={styles.headerTextStyle}>Food App</Text>
                        
                    </View>

                    <View style={{alignItems:"center"}}>       
                        <Text style={styles.subHeadingFont}>Create your Account Here</Text>
                    </View>

                    <View style={styles.textInputView}>
                        <Avatar url={avatarPath} size={100} onUpload={setAvatarPath} />

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter your full name"
                                value={fullName}
                                onChangeText={setFullName}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter your username"
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter your password"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <TouchableOpacity style={styles.pressableContainer} onPress={handleRegister}>
                            <Text style={styles.registerButtonText}>Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.back('../Login')} style={styles.loginRedirect}>
                            <Text style={styles.loginText}>Already have an account? Log in</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    headerTextStyle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    mainView: {
        marginTop: 50,
    },
    subHeadingFont: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 12,
        color: 'red',
        alignItems:"center"
    },
    textInputView: {
        marginTop: 30,
        alignItems: 'center',
    },
    inputContainer: {
        marginTop: 15,
        width: 300,
    },
    label: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    textInput: {
        color: 'gray',
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
    },
    pressableContainer: {
        width: 200,
        backgroundColor: '#fd5c63',
        borderRadius: 6,
        marginTop: 30,
        padding: 15,
    },
    registerButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    loginRedirect: {
        marginTop: 20,
    },
    loginText: {
        textAlign: 'center',
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
