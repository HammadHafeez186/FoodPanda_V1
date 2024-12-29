import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, TextInput, Alert,FlatList, ScrollView, ActivityIndicator} from 'react-native'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'expo-router'
import Avatar from '../../components/Avatar'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { addToCart, cleanCart } from '../../redux/CartReducer'
import acoountStyles from "../../Styles/AccountsStyles"

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
    const [showAccountOptions, setShowAccountOptions] = useState(false)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        fetchUserEmail()
        fetchOrders()
    }, [])

    const fetchUserEmail = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            setEmail(user.email || '')
        }
    }

    const fetchOrders = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('No authenticated user found')

            const { data, error } = await supabase
                .from('cart_items')
                .select(`
                    id,
                    hotel_id,
                    item_name,
                    price,
                    quantity,
                    created_at,
                    cart_item_addons (
                        id,
                        addon_name,
                        addon_price
                    )
                `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) throw error

            setOrders(data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching orders:', error)
            setLoading(false)
        }
    }

    const handleEditProfile = () => {
        setShowVerification(true)
        setShowAccountOptions(false)
    }

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
            setShowAccountOptions(false)
        } catch (error) {
            Alert.alert('Error updating profile', error.message)
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

    const handleReorder = (items) => {
        dispatch(cleanCart())
        items.forEach(item => {
            dispatch(addToCart({
                id: item.id,
                name: item.item_name,
                price: item.price,
                quantity: item.quantity,
                hotel_id: item.hotel_id,
                addons: item.cart_item_addons
            }))
        })
        router.push('/Cart')
    }

    const renderOrderItem = ({ item }) => (
        <View style={acoountStyles.orderItem}>
            <Text style={acoountStyles.itemName}>{item.item_name}</Text>
            <Text style={acoountStyles.itemQuantity}>Qty: {item.quantity}</Text>
            <Text style={acoountStyles.itemPrice}>Rs. {item.price.toFixed(2)}</Text>
            {item.cart_item_addons.length > 0 && (
                <View style={acoountStyles.addonsContainer}>
                    <Text style={acoountStyles.addonsTitle}>Addons:</Text>
                    {item.cart_item_addons.map(addon => (
                        <Text key={addon.id} style={acoountStyles.addonItem}>
                            {addon.addon_name} - Rs. {addon.addon_price.toFixed(2)}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    )

    const renderOrder = ({ item }) => (
        <View style={acoountStyles.orderContainer}>
            <View style={acoountStyles.orderHeader}>
                <Text style={acoountStyles.orderDate}>{new Date(item.created_at).toLocaleDateString()}</Text>
                <TouchableOpacity
                    style={acoountStyles.reorderButton}
                    onPress={() => handleReorder([item])}
                >
                    <Text style={acoountStyles.reorderButtonText}>Reorder</Text>
                </TouchableOpacity>
            </View>
            <View style={acoountStyles.orderItem}>
                <Text style={acoountStyles.itemName}>{item.item_name}</Text>
                <Text style={acoountStyles.itemQuantity}>Qty: {item.quantity}</Text>
                <Text style={acoountStyles.itemPrice}>Rs. {item.price.toFixed(2)}</Text>
                {item.cart_item_addons.length > 0 && (
                    <View style={acoountStyles.addonsContainer}>
                        <Text style={acoountStyles.addonsTitle}>Addons:</Text>
                        {item.cart_item_addons.map(addon => (
                            <Text key={addon.id} style={acoountStyles.addonItem}>
                                {addon.addon_name} - Rs. {addon.addon_price.toFixed(2)}
                            </Text>
                        ))}
                    </View>
                )}
            </View>
        </View>
    )

    const renderContent = () => {
        if (showDeleteAccount) {
            return (
                <View style={acoountStyles.formContainer}>
                    <Text style={acoountStyles.headerTextStyle}>Delete Account</Text>
                    <Text style={acoountStyles.warningText}>Warning: This action cannot be undone.</Text>
                    <Text style={acoountStyles.inputLabel}>Type "I understand" to confirm:</Text>
                    <TextInput
                        style={acoountStyles.textInput}
                        value={deleteConfirmation}
                        onChangeText={setDeleteConfirmation}
                        placeholder="I understand"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={acoountStyles.dangerButton} onPress={handleDeleteAccount}>
                        <Text style={acoountStyles.buttonText}>Delete My Account</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (showAccountOptions) {
            if (!isAuthenticated) {
                return (
                    <View style={acoountStyles.formContainer}>
                        <Text style={acoountStyles.headerTextStyle}>Verify Your Identity</Text>
                        <TextInput
                            style={acoountStyles.textInput}
                            placeholder="Email"
                            value={email}
                            editable={false}
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            style={acoountStyles.textInput}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor="#888"
                        />
                        <TouchableOpacity style={acoountStyles.primaryButton} onPress={verifyPassword}>
                            <Text style={acoountStyles.buttonText}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <ScrollView contentContainerStyle={acoountStyles.formContainer}>
                        <Text style={acoountStyles.headerTextStyle}>Edit Profile</Text>
                        <Avatar
                            size={200}
                            url={avatarUrl}
                            onUpload={(url) => {
                                setAvatarUrl(url)
                            }}
                        />
                        <TextInput
                            style={acoountStyles.textInput}
                            placeholder="Full Name"
                            value={fullName}
                            onChangeText={setFullName}
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            style={acoountStyles.textInput}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            style={acoountStyles.textInput}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="#888"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={acoountStyles.textInput}
                            placeholder="New Password (Leave empty to keep current)"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            style={acoountStyles.textInput}
                            placeholder="Confirm New Password"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholderTextColor="#888"
                        />
                        <TouchableOpacity style={acoountStyles.primaryButton} onPress={handleUpdate}>
                            <Text style={acoountStyles.buttonText}>Update Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={acoountStyles.dangerButton} onPress={() => setShowDeleteAccount(true)}>
                            <Text style={acoountStyles.buttonText}>Delete Account</Text>
                        </TouchableOpacity>
                    </ScrollView>
                )
            }
        } else {
            return (
                <View style={acoountStyles.contentContainer}>
                    <Text style={acoountStyles.sectionTitle}>Past Orders</Text>
                    {loading ? (
                        <ActivityIndicator size="large" color="#FF2B85" />
                    ) : orders.length > 0 ? (
                        <FlatList
                            data={orders}
                            renderItem={renderOrder}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    ) : (
                        <Text style={acoountStyles.emptyStateText}>No past orders found</Text>
                    )}
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={acoountStyles.safeAreaContainer}>
            <View style={acoountStyles.container}>
                <View style={acoountStyles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={acoountStyles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FF2B85" />
                    </TouchableOpacity>
                    <Text style={acoountStyles.headerTitle}>Account</Text>
                    <TouchableOpacity onPress={() => setShowAccountOptions(!showAccountOptions)} style={acoountStyles.optionsButton}>
                        <Ionicons name={showAccountOptions ? "close" : "settings-outline"} size={24} color="#FF2B85" />
                    </TouchableOpacity>
                </View>

                {renderContent()}

                {!showAccountOptions && (
                    <View style={acoountStyles.footer}>
                        <TouchableOpacity style={acoountStyles.logoutButton} onPress={handleLogout}>
                            <Text style={acoountStyles.logoutButtonText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}



export default Accounts;

