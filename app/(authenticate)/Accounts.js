import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, FlatList,} from 'react-native'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'expo-router'
import styles from '../../Styles/AccountsStyles'

const Accounts = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [showVerification, setShowVerification] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const fetchUserEmail = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setEmail(user.email || '')
            }
        }
        fetchUserEmail()
    }, [])

    const handleEditProfile = () => setShowVerification(true)

    const verifyPassword = async () => {
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error
            await fetchProfileData()
            setIsAuthenticated(true)
        } catch (error) {
            Alert.alert('Authentication Failed', error.message)
        }
    }

    const fetchProfileData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('No authenticated user found')

            const { data, error } = await supabase
                .from('profiles')
                .select('username, full_name, avatar_url')
                .eq('id', user.id)
                .single()

            if (error) throw error

            setUsername(data?.username || '')
            setFullName(data?.full_name || '')
        } catch (error) {
            Alert.alert('Error fetching profile', error.message)
        }
    }

    const handleUpdate = async () => {
        if (newPassword && newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match')
            return
        }

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('No authenticated user found')

            const { error } = await supabase
                .from('profiles')
                .update({
                    username,
                    full_name: fullName,
                })
                .eq('id', user.id)

            if (error) throw error

            if (newPassword) {
                const { error: passwordError } = await supabase.auth.updateUser({
                    password: newPassword,
                })
                if (passwordError) throw passwordError
            }

            Alert.alert('Success', 'Profile updated successfully!')
            router.push('../../MainPage')
        } catch (error) {
            Alert.alert('Error updating profile', error.message)
        }
    }

    const handleGoBack = () => showVerification ? setShowVerification(false) : router.back()

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut()
            Alert.alert('Logged Out', 'You have been signed out successfully!')
            router.replace('/Login')
        } catch (error) {
            Alert.alert('Error', 'There was an error logging out.')
        }
    }

    const renderItem = () => {
        if (!showVerification) {
            return (
                <View style={styles.formContainer}>
                    <Text style={styles.headerTextStyle}>Profile Management</Text>
                    <TouchableOpacity style={styles.primaryButton} onPress={handleEditProfile}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (!isAuthenticated) {
            return (
                <View style={styles.formContainer}>
                    <Text style={styles.headerTextStyle}>Verify Your Identity</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        value={email}
                        editable={false}
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={styles.primaryButton} onPress={verifyPassword}>
                        <Text style={styles.buttonText}>Verify</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.formContainer}>
                    <Text style={styles.headerTextStyle}>Edit Profile</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={setFullName}
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="New Password (Leave empty to keep current)"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Confirm New Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={styles.primaryButton} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>Update Profile</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>

                <FlatList
                    data={[{ key: 'profile' }]} // Dummy data for FlatList
                    renderItem={renderItem}
                    keyboardShouldPersistTaps="handled"
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Accounts
