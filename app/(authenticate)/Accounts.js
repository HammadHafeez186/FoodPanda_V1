import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, FlatList, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'expo-router'
import Avatar from '../../components/Avatar'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { addToCart, cleanCart } from '../../redux/CartReducer'

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
        <View style={styles.orderItem}>
            <Text style={styles.itemName}>{item.item_name}</Text>
            <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
            <Text style={styles.itemPrice}>Rs. {item.price.toFixed(2)}</Text>
            {item.cart_item_addons.length > 0 && (
                <View style={styles.addonsContainer}>
                    <Text style={styles.addonsTitle}>Addons:</Text>
                    {item.cart_item_addons.map(addon => (
                        <Text key={addon.id} style={styles.addonItem}>
                            {addon.addon_name} - Rs. {addon.addon_price.toFixed(2)}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    )

    const renderOrder = ({ item }) => (
        <View style={styles.orderContainer}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderDate}>{new Date(item.created_at).toLocaleDateString()}</Text>
                <TouchableOpacity
                    style={styles.reorderButton}
                    onPress={() => handleReorder([item])}
                >
                    <Text style={styles.reorderButtonText}>Reorder</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.orderItem}>
                <Text style={styles.itemName}>{item.item_name}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                <Text style={styles.itemPrice}>Rs. {item.price.toFixed(2)}</Text>
                {item.cart_item_addons.length > 0 && (
                    <View style={styles.addonsContainer}>
                        <Text style={styles.addonsTitle}>Addons:</Text>
                        {item.cart_item_addons.map(addon => (
                            <Text key={addon.id} style={styles.addonItem}>
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
        } else if (showAccountOptions) {
            if (!isAuthenticated) {
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
        } else {
            return (
                <View style={styles.contentContainer}>
                    <Text style={styles.sectionTitle}>Past Orders</Text>
                    {loading ? (
                        <ActivityIndicator size="large" color="#FF2B85" />
                    ) : orders.length > 0 ? (
                        <FlatList
                            data={orders}
                            renderItem={renderOrder}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    ) : (
                        <Text style={styles.emptyStateText}>No past orders found</Text>
                    )}
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FF2B85" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Account</Text>
                    <TouchableOpacity onPress={() => setShowAccountOptions(!showAccountOptions)} style={styles.optionsButton}>
                        <Ionicons name={showAccountOptions ? "close" : "settings-outline"} size={24} color="#FF2B85" />
                    </TouchableOpacity>
                </View>

                {renderContent()}

                {!showAccountOptions && (
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    optionsButton: {
        padding: 8,
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    headerTextStyle: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '700',
        marginBottom: 30,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333333',
    },
    orderContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    orderDate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    reorderButton: {
        backgroundColor: '#FF2B85',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    reorderButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    orderItem: {
        marginBottom: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#666666',
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FF2B85',
    },
    addonsContainer: {
        marginTop: 4,
    },
    addonsTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666666',
    },
    addonItem: {
        fontSize: 12,
        color: '#888888',
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    logoutButton: {
        backgroundColor: '#FF2B85',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    primaryButton: {
        backgroundColor: '#FF2B85',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    secondaryButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    dangerButton: {
        backgroundColor: '#ff3b30',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontWeight: '700',
        color: 'white',
        fontSize: 16,
    },
    textInput: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    inputLabel: {
        fontSize: 14,
        marginBottom: 5,
        color: '#333',
    },
    warningText: {
        color: '#ff3b30',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default Accounts;

