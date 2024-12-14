import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, FlatList, ScrollView } from 'react-native'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'expo-router'
import styles from '../../Styles/AccountsStyles'
import Avatar from '../../components/Avatar'

const Accounts = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [showVerification, setShowVerification] = useState(false)
    const [showDeleteAccount, setShowDeleteAccount] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState('')
    const router = useRouter()

    useEffect(() => {
        fetchUserEmail()
    }, [])

    const fetchUserEmail = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            setEmail(user.email || '')
        }
    }

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
            setAvatarUrl(data?.avatar_url || '')
            setEmail(user.email || '')
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

            const updates = {
                username,
                full_name: fullName,
                avatar_url: avatarUrl,
            }

            const { error: profileError } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id)

            if (profileError) throw profileError

            const { error: authError } = await supabase.auth.updateUser({
                email: email,
                password: newPassword || undefined,
            })

            if (authError) throw authError

            Alert.alert('Success', 'Profile updated successfully!')
            router.push('../../MainPage')
        } catch (error) {
            Alert.alert('Error updating profile', error.message)
        }
    }

    const handleGoBack = () => {
        if (showDeleteAccount) {
            setShowDeleteAccount(false)
        } else if (showVerification) {
            setShowVerification(false)
        } else {
            router.back()
        }
    }

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut()
            Alert.alert('Logged Out', 'You have been signed out successfully!')
            router.replace('/Login')
        } catch (error) {
            Alert.alert('Error', 'There was an error logging out.')
        }
    }

    const handleDeleteAccount = async () => {
        if (deleteConfirmation !== 'I understand') {
            Alert.alert('Error', 'Please type "I understand" to confirm account deletion.')
            return
        }

        try {
            const { data, error } = await supabase.rpc('delete_user')
            
            if (error) throw error
            if (!data.success) throw new Error(data.error)

            await supabase.auth.signOut()
            Alert.alert('Account Deleted', 'Your account has been successfully deleted.')
            router.replace('/Login')
        } catch (error) {
            console.error('Error deleting account:', error)
            Alert.alert('Error', 'There was an error deleting your account. Please try again.')
        }
    }

    const renderItem = () => {
        if (showDeleteAccount) {
            return (
                <View style={styles.formContainer}>
                    <Text style={styles.headerTextStyle}>Delete Account</Text>
                    <Text style={styles.warningText}>Warning: This action cannot be undone.</Text>
                    <Text style={styles.inputLabel}>Type "I understand" to confirm:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={deleteConfirmation}
                        onChangeText={setDeleteConfirmation}
                        placeholder="I understand"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteAccount}>
                        <Text style={styles.buttonText}>Delete My Account</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (!showVerification) {
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
                <ScrollView contentContainerStyle={styles.formContainer}>
                    <Text style={styles.headerTextStyle}>Edit Profile</Text>
                    <Avatar
                        size={200}
                        url={avatarUrl}
                        onUpload={(url) => {
                            setAvatarUrl(url)
                        }}
                    />
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
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="none"
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
                    <TouchableOpacity style={styles.dangerButton} onPress={() => setShowDeleteAccount(true)}>
                        <Text style={styles.buttonText}>Delete Account</Text>
                    </TouchableOpacity>
                </ScrollView>
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
                    data={[{ key: 'profile' }]}
                    renderItem={renderItem}
                    keyboardShouldPersistTaps="handled"
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Accounts