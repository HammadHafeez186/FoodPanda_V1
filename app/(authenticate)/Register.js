import React, { useState, useRef } from 'react'
import { 
  SafeAreaView, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Modal,
  Image,
} from 'react-native'
import { supabase } from '../../lib/supabase'
import Avatar from '../../components/Avatar'
import { useRouter } from 'expo-router'
import styles from '../../Styles/RegisterStyles'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [avatarPath, setAvatarPath] = useState('')
    const [isOtpModalVisible, setOtpModalVisible] = useState(false)
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()
    const otpInputs = useRef([])

    const handleRegister = async () => {
        try {
            setError('')
            setSuccess('')
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username,
                        full_name: fullName,
                        avatar_url: avatarPath
                    }
                }
            })

            if (error) throw error

            if (data.user) {
                const { error: profileError } = await supabase.rpc('create_or_update_profile', {
                    user_id: data.user.id,
                    username,
                    full_name: fullName,
                    avatar_url: avatarPath
                })

                if (profileError) throw profileError
            }

            setOtpModalVisible(true)
        } catch (error) {
            setError(error.message)
        }
    }

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value !== '' && index < 5) {
            otpInputs.current[index + 1].focus()
        }

        if (newOtp.every(digit => digit !== '')) {
            handleVerifyOtp(newOtp.join(''))
        }
    }

    const handleVerifyOtp = async (otpValue) => {
        try {
            setError('')
            setSuccess('')
            const { error } = await supabase.auth.verifyOtp({
                email,
                token: otpValue,
                type: 'signup'
            })

            if (error) throw error

            setSuccess('OTP Verified! You can now proceed to login.')
            setTimeout(() => {
                router.replace("../Login")
            }, 2000)
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.logoContainer}>
                    <Image 
                        source={require("../../images/loginLogo.png")} 
                        style={styles.logo}
                    />
                </View>

                <View style={styles.headingContainer}>
                    <Text style={styles.subHeadingFont}>Create your Account Here</Text>
                </View>

                <View style={styles.avatarContainer}>
                    <Avatar url={avatarPath} size={100} onUpload={setAvatarPath} />
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your full name"
                        value={fullName}
                        onChangeText={setFullName}
                        returnKeyType="next"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your username"
                        value={username}
                        onChangeText={setUsername}
                        returnKeyType="next"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType="next"
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
                        returnKeyType="done"
                    />
                </View>

                <TouchableOpacity 
                    style={styles.registerButton} 
                    onPress={handleRegister}
                >
                    <Text style={styles.registerButtonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => router.replace('../Login')} 
                    style={styles.loginRedirect}
                >
                    <Text style={styles.loginText}>Already have an account? Log in</Text>
                </TouchableOpacity>

                <Modal
                    visible={isOtpModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setOtpModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.subHeadingFont}>Enter OTP</Text>
                            <View style={styles.otpContainer}>
                                {otp.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        style={styles.otpInput}
                                        value={digit}
                                        onChangeText={(value) => handleOtpChange(value, index)}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        ref={el => otpInputs.current[index] = el}
                                    />
                                ))}
                            </View>
                            {error ? <Text style={styles.errorText}>{error}</Text> : null}
                            {success ? <Text style={styles.successText}>{success}</Text> : null}
                            <TouchableOpacity
                                style={styles.loginRedirect}
                                onPress={() => setOtpModalVisible(false)}
                            >
                                <Text style={styles.loginText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Register
